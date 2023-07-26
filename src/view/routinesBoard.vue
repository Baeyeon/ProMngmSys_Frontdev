<template>
    <div class="example-pagination-block">
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="proName" label="项目名称" width="180" />
            <el-table-column prop="proRoutine" label="项目流程" width="180" />
        </el-table>
        <el-pagination layout="prev, pager, next" :total="1000" />

    </div>

</template>

<script>
    export default {
        name: "routinesBoard",

        data(){
            return{
                tableData:[
                    {
                        proName:'测试项目1',
                        proRoutine:'流程1'
                    },
                    {
                        proName:'测试项目2',
                        proRoutine:'流程2'
                    }
                ],   //项目列表
            };
        }
    }


</script>

<style scoped>
    .example-pagination-block + .example-pagination-block {
        margin-top: 10px;
    }
    .example-pagination-block .example-demonstration {
        margin-bottom: 16px;
    }
</style>
