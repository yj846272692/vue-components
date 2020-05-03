export default{
  // 菜单业务大类的关系
  userMenuCategoryCfg: state => state.userMenuCategoryCfg,
  // 费用申请的叶子
  fyMenuLeafs: state => {
    let fymenu = null
    const fyleafs = []
    const userMenuTree = state.userMenuTree;
    userMenuTree.some(item => {
      if(item.menuCode === "feiyongshenqing"){
        fymenu = item
        return true
      }
    })
    const findleaf = (menu) => {
      menu.children.map(item => {
        if(item.children.length === 0){
          fyleafs.push(item)
        }else{
          findleaf(item)
        }
      })
    }
    if(fymenu){
      findleaf(fymenu)
    }
    return fyleafs
  },
  // 登陆用户信息
  userEmpInfo: state => state.userEmpInfo,
}