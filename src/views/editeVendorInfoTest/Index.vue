<template>
    <div>
        <h1>editeVendorInfoTest组件</h1>
        <div class="anchor">
            <h2 id="概述">概述</h2>
            <a href="#概述">#</a>
        </div>

        <p>编辑供应商信息组件</p>

        <div class="anchor">
            <h2 id="代码示例">代码示例</h2>
            <a href="#代码示例">#</a>
        </div>
        <Row class="example">
            <Col class="example-demo" span="24">
            <div class="example-case">
                <!-- invoiceNo claimNo 临时赋了一个值，为了查询到数据方便测试 -->
                <VendorInfo size="small" :value="inputValue" paymentState="prepareForPayment" invoiceNo="DFEG000" claimNo="88" vendorCode="vendorCode" @handleClick="handleClickVendor" style="width:180px"></VendorInfo>
            </div>

            <header class="example-header">
                <span>
                    基础用法
                    <a href="#基础用法">#</a>
                </span>
            </header>
            <div class="example-desc">
                <p>基本用法。点击付款申请明细行，弹出编辑供应商信息组件。</p>
            </div>
            </Col>
        </Row>
        <div class="api">
            <div class="anchor">
                <h2 id="API">API</h2>
                <a href="#API">#</a>
            </div>

            <div class="anchor">
                <h3 id="props">props</h3>
                <a href="#props">#</a>
            </div>
            <Table :columns="propsColumns" :data="propsData"></Table>
            <div style="marginTop:10px"></div>
            <Table :columns="eventsColumns" :data="eventsData"></Table>
        </div>
    </div>
</template>
<script>
import VendorInfo from "@/components/vendorInfo/VendorInfo";
export default {
    data() {
        return {
            inputValue: "",
            propsColumns: [
                {
                    title: "属性",
                    key: "prop",
                    width: 160
                },
                {
                    title: "说明",
                    key: "description",
                    minWidth: 250
                },
                {
                    title: "类型",
                    key: "type",
                    minWidth: 80
                },
                {
                    title: "默认值",
                    key: "defaultVal",
                    minWidth: 80
                }
            ],
            propsData: [
                {
                    prop: "paymentState",
                    description:
                        "通过付款状态paymentState来判断供应商是否可以编辑保存，只有当付款状态为准备付款时，才可以保存编辑之后的供应商信息。",
                    type: "String",
                    defaultVal: "-"
                },
                {
                    prop: "buCode",
                    description:
                        "<SelectVendorBankInfo></SelectVendorBankInfo>查供应商银行信息组件入参参数",
                    type: "String",
                    defaultVal: "-"
                },
                {
                    prop: "invoiceNo(发票编号)",
                    description:
                        "<VendorInfo></VendorInfo>查询供应商组件入参参数",
                    type: "String",
                    defaultVal: "-"
                },
                {
                    prop: "claimNo(付款申请单号)",
                    description:
                        "<VendorInfo></VendorInfo>查询供应商组件入参参数",
                    type: "String",
                    defaultVal: "-"
                }
            ],

            eventsColumns: [
                {
                    title: "事件名",
                    key: "eventName",
                    width: 160
                },
                {
                    title: "说明",
                    key: "description",
                    minWidth: 250
                },
                {
                    title: "返回值",
                    key: "returnVal",
                    minWidth: 180
                }
            ],
            eventsData: [
                {
                    eventName: "handleClickVendor",
                    description:
                        "点击收款方账号输入框，弹出供应商银行信息，选择某一条，回显供应商信息",
                    returnVal: "供应商信息"
                }
            ]
        };
    },
    components: {
        VendorInfo
    },
    methods: {
        handleClickVendor(data) {
            this.inputValue = data.vendorName;
        }
    }
};
</script>
<style scoped>
</style>

