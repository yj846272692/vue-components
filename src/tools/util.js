import axios from 'axios';
import qs from 'qs';
let util = {

};


util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

// util.getPathObjByName = function (vm, name) {
//     let pathObj = vm.$store.state.routers.filter((item) => {
//         if (item.children.length <= 1) {
//             return item.name === name;
//         } else {
//             let i = 0;
//             let childArr = item.children;
//             let len = childArr.length;
//             while (i < len) {
//                 if (childArr[i].name === name) {
//                     return true;
//                 }
//                 i++;
//             }
//             return false;
//         }
//     })[0];
//     return pathObj;
// };

util.setCurrentPath = function (vm, name) {
    let pathList = []
    let i = $store.state.userMenu.findIndex((item) => {
        return item.actionUrl == name;
    })
    switch (name) {
        case 'feedback':
            pathList.unshift({
                title: '我的建议反馈',
                path: 'feedback',
                name: name
            })
            break;
    }
    if (!!~i) {
        pathList.unshift({
            title: $store.state.userMenu[i].menuName,
            path: $store.state.userMenu[i].actionUrl,
            name: name
        })
        util.getPathObjByName(pathList, $store.state.userMenu[i].menuModuleId);
    }
    pathList.unshift({
        title: '首页',
        path: '/home',
        name: 'home_index'
    })
    $store.commit('setCurrentPath', pathList);
    return pathList
};
util.getPathObjByName = function (list, menuId) {
    let i = $store.state.userMenu.findIndex((item) => {
        return item.menuId == menuId;
    })
    if (i > -1) {
        list.unshift({
            title: $store.state.userMenu[i].menuName,
            path: $store.state.userMenu[i].actionUrl,
            name: name
        })
        util.getPathObjByName(list, $store.state.userMenu[i].menuModuleId);
    }
}

util.openPage = function (vm, name, title) {
    vm.$router.push({
        name: name
    });
    let hasOpened = false;
    vm.pageTagsList.forEach((item, index) => {
        if (item.name === name) {
            hasOpened = true;
            vm.$store.commit('moveToSecond', index);
        }
    });
    if (!hasOpened) {
        vm.$store.commit('increateTag', { name: name, title: title });
    }
};
util.copyPros = function (source, target, excludeNames = [], callback = function () { }) {
    if (Object.prototype.toString.call(source) != '[object Object]') {
        console.error('source must be a object!');
        return;
    }
    if (Object.prototype.toString.call(target) != '[object Object]') {
        console.error('target must be a object!');
        return;
    }
    if (excludeNames && Object.prototype.toString.call(excludeNames) != '[object Array]') {
        console.error('excludeNames must be a array!');
        return;
    }
    for (let key of Object.keys(source)) {
        if (!excludeNames || !excludeNames.includes(key)) {
            source[key] = target[key];
        }
    }
    return source;
};

util.getUrlParams = function () {
    // !!!这里不能取location.search,因为如果值里面有#那么会有截断现象，只能取href
    let searchStr = location.href.split('?')[1];
    let result = {};
    if (!searchStr) {
        return result;
    } else {
        return qs.parse(searchStr);
    }
};

util.getDaysDiff = function (startDay, endDay) {
    return Math.floor((endDay - startDay) / 1000 / 60 / 60 / 24 + 0.5);
}

util.closeWebPage = function () {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = 'about:blank ';
    } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

export default util;
