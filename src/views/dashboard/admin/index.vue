<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group :users="users" :sales="sales" :order-count="orderCount" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="purchases" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner';
import PanelGroup from './components/PanelGroup';
import LineChart from './components/LineChart';
import RaddarChart from './components/RaddarChart';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import { getList as getUserList } from '@/api/users/index';
import { getList as getOrderList } from '@/api/order/index';

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      users: 0,
      orderCount: 0,
      sales: 0,
      purchases: {
        actualData: [],
        actualDate: []
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {

    dealData(data) {
      data.forEach((v, i) => {
        this.purchases.actualData.push(v.totalPay);
        this.purchases.actualDate.push(v.createTime);
      });
      console.info('ceshi', this.purchases);
    },
    async fetchData() {
      await getUserList().then(res => {
        try {
          const { data } = res;
          this.users = data.length;
        } catch (e) {
          console.error(e);
        }
      });
      await getOrderList().then(res => {
        try {
          const { data } = res;
          this.orderCount = data.length;
          for (const count of data) {
            this.sales += count.totalPay;
          }
          this.dealData(data);
        } catch (e) {
          console.error(e);
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
