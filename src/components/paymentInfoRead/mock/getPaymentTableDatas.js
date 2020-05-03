const list = []
const listItem = {
  "a|1": [
    "转账TSS",
    "网银",
    "应付票据",
    "现金",
    "支票"
  ],
  b: "646464646366262661",
  c: "0.0000000",
  d: "其他银行代扣沙发上的",
  "e|1": [
    "转账",
    "网银",
    "票据",
    "现金",
    "支票"
  ],
}
for(var i = 0; i < 5; i++) {
  list.push(listItem)
}

const data = {
  "total": 3,
  "list": list,
  "pageNum": 1,
	"pageSize": 10,
	"size": 10,
	"startRow": 1,
	"endRow": 10,
	"pages": 2,
	"prePage": 0,
	"nextPage": 2,
	"isFirstPage": true,
	"isLastPage": false,
	"hasPreviousPage": false,
	"hasNextPage": true,
	"navigatePages": 8,
	"navigatepageNums": [1, 2],
	"navigateFirstPage": 1,
	"navigateLastPage": 2,
	"firstPage": 1,
	"lastPage": 2
}

export default data
