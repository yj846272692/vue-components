<template>
    <div>
        <h1>弹出框table组件</h1>
        <div class="anchor">
            <h2 id="概述">概述</h2>
            <a href="#概述">#</a>
        </div>

        <p>选择员工/供应商组件</p>

        <!-- <Alert show-icon>如果传入数据初始化该组件，数据格式必须严格为: [{label: '西安', value: 'xian'}]这种格式</Alert> -->

        <div class="anchor">
            <h2 id="代码示例">代码示例</h2>
            <a href="#代码示例">#</a>
        </div>
        <Row class="example">
            <Col class="example-demo" span="24">
            <div class="example-case">
                <SelectVendor v-model="cityName" @handleSelect="handleSelect" style="width:200px"></SelectVendor>
            </div>

            <header class="example-header">
                <span>
                    基础用法
                    <a href="#基础用法">#</a>
                </span>
            </header>
            <div class="example-desc">
                <p>基本用法。可以使用 code 传入值集code进行查询。</p>
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

            <!-- <div class="anchor"><h3 id="events">events</h3><a href="#events">#</a></div>
            <Table :columns="eventsColumns" :data="eventsData"></Table> -->
        </div>
    </div>
</template>
<script>
import SelectVendor from "@/components/selectVendor/Index";
export default {
  data() {
    return {
      cityName: "",
      propsColumns: [
        {
          title: "属性",
          key: "prop",
          width: 120
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
          prop: "datas",
          description:
            'DataSelect 组件数据源。注意,格式必须为类似 [{label: "转账", value: "1"}] 格式的数组',
          type: "Array",
          defaultVal: "-"
        }
      ],

      eventsColumns: [
        {
          title: "事件名",
          key: "eventName",
          width: 120
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
          eventName: "",
          description: "",
          returnVal: ""
        }
      ]
    };
  },
  components: {
    SelectVendor
  },
  methods: {
    handleSelect(data) {
      console.log(JSON.stringify(data));
    }
  }
};
</script>
<style scoped>
</style>

