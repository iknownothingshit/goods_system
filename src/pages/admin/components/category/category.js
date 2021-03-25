import { message } from 'antd'
import { changeCategory, fetchCategory, createCategory, destoryCategory } from '../../../../api/ajax'

let curTargetItem;// 当前操作的行数据

// 打开模态框
export const openModal = (action, setCurAction, setIsActionModalVis, record) => {
    curTargetItem = record;
    setCurAction(action);
    setIsActionModalVis(true);
}

// 关闭模态框
export const closeModal = (setIsActionModalVis) => {
    curTargetItem = null;
    setIsActionModalVis(false);
}

// 点击搜索
export const search = (val, e, tableData, setCurSearchData) => {
    if (!val.length) return;
    let data = [...tableData];
    let results = [];
    data.forEach((e, i) => {
        if (e.name.indexOf(val) > -1) {
            results.push({ ...e });
        }
    })
    if (results.length == 0) message.warning('暂时搜不到相关结果');
    setCurSearchData(results);
}

// 处理点击确认事件
export const handleOk = (curAction, keyword, setTableData, setIsActionModalVis, setKeyword) => {
    switch (true) {
        case curAction === '添加': addCategory(keyword, setTableData); break;
        case curAction === '删除': deleteCategory(setTableData); break;
        case curAction === '修改': modifyCategory(keyword, setTableData); break;
        default: break;
    }
    setIsActionModalVis(false);
    setKeyword('');
}


// 添加分类
export const addCategory = async (keyword, setTableData) => {
    const res = await createCategory({ name: keyword });
    console.log("新增分类：", res);
    if (res.data.code) {
        fetchAllCategories(setTableData);
    } else {
        message.error('出了点问题，重试吧');
    }
}

// 删除分类
export const deleteCategory = async (setTableData) => {
    const res = await destoryCategory({ id: curTargetItem.key, name: curTargetItem.name });
    console.log('删除分类:', res);
    if (res.data.code) {
        fetchAllCategories(setTableData);
    } else {
        message.error('删除出错，请检查后重试');
    }
}

// 修改分类
export const modifyCategory = async (keyword, setTableData) => {
    const res = await changeCategory({ id: curTargetItem.key, name: curTargetItem.name, newName: keyword });
    console.log('修改分类:', res);
    if (res.data.code) {
        fetchAllCategories(setTableData);
    } else {
        message.error('修改出错，请检查后重试');
    }
}

// 获取分类
export const fetchAllCategories = async (setTableData) => {
    const res = await fetchCategory();
    console.log('所有分类', res);

    if (res.data.code) {
        let newTable = [];
        res.data.data.rows.forEach((e, i) => {
            newTable.push({ key: e.category_id, name: e.category_name })
        })
        setTableData(newTable);
    } else {
        message.error('获取分类失败，请检查问题后重试');
    }
}