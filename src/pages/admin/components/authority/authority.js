import { message } from 'antd'
import { authorityChange, getAllUsers } from '../../../../api/ajax'

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
        if (e.admin.indexOf(val) > -1) {
            results.push({ ...e });
        }
    })
    if (results.length == 0) message.warning('暂时搜不到相关结果');
    setCurSearchData(results);
}

// 修改权限
export const modifyAuthority = async (newAuthority, curItem, setTableData) => {
    if (!newAuthority) return;
    const res = await authorityChange({ id: curItem.id, authority: newAuthority });
    console.log('修改权限:', res);
    if (res.data.code) {
        fetchAllAdmins(setTableData);
    } else {
        message.error('修改出错，请检查后重试');
    }
}

// 获取所有管理员
export const fetchAllAdmins = async (setTableData) => {
    const res = await getAllUsers();
    console.log('所有管理员', res);

    if (res.data.code) {
        let newTable = [];
        res.data.data.rows.forEach((e, i) => {
            newTable.push({ id: e.admin_id, admin: e.admin, authority: e.authority })
        })
        setTableData(newTable);
    } else {
        message.error('获取所有管理员失败，请检查问题后重试');
    }
}