import { message } from 'antd'
import { fetchCategory, fetchAllGoods, uploadImg, createGood, deleteGood, modifyGood } from '../../../../api/ajax'

let curImg = null;// 当前即将上传的图片
let stateApi = {};// 页面所有setStateapi

// 获取所有setState api
export const getSetStateApi = (setIsFormVis, setIsDetailVis, setTableData, setCurGood, setHasImg, setSearchData, setCategories) => {
    stateApi = {
        setIsFormVis, setIsDetailVis, setTableData, setCurGood, setHasImg, setSearchData, setCategories
    }
}

// 点击搜索
export const search = (val, e, tableData, searchType) => {
    if (!val.length) return;
    let data = [...tableData];
    let results = [];
    data.forEach((e, i) => {
        if (e.name.indexOf(val) > -1 && searchType === '按名称搜索') {
            results.push({ ...e });
        } else if (e.describe.indexOf(val) > -1 && searchType === '按描述搜索') {
            results.push({ ...e });
        }
    })
    if (!results.length) message.warning('暂时搜不到相关结果');
    stateApi.setSearchData(results);
}

// 添加商品
export const addGoods = async (formRef) => {
    let formData = formRef.current.getFieldsValue(true);
    console.log('表单数据:', formData);

    let img = await getImgUploaded();

    let data = {
        goods_name: formData.name,
        goods_category: formData.category,
        price: formData.price,
        count: formData.count,
        monthly_sales: Math.floor(Math.random() * 102),
        describe: formData.desc,
        status: formData.status,
        img,
    }

    const res = await createGood(data);

    console.log('添加商品', res);

    if (res.data.code) {
        fetchGoods();
        stateApi.setIsFormVis(false);
        formRef.current.resetFields();
    } else {
        message.error('出了点问题，重试吧');
    }
}

// 删除商品
export const confirmDeleteGood = async (id) => {
    const res = await deleteGood({ id });
    console.log('删除商品:', res);
    if (res.data.code) {
        fetchGoods();
    } else {
        message.error('删除出错，请检查后重试');
    }
}

// 上/下架商品
export const onOffGood = async (curGood) => {
    const res = await modifyGood({ id: curGood.key, status: !curGood.status });
    console.log('上/下架商品:', res);
    if (res.data.code) {
        fetchGoods();
        stateApi.setIsDetailVis(false);
    } else {
        message.error('修改出错，请检查后重试');
    }
}

// 获取商品
export const fetchGoods = async () => {
    const res = await fetchAllGoods();
    console.log('所有商品', res);

    if (res.data.code) {
        let newTable = [];
        res.data.data.rows.forEach((e, i) => {
            newTable.push({
                key: e.id,
                name: e.goods_name,
                describe: e.describe,
                goods_category: e.goods_category,
                count: e.count,
                monthly_sales: e.monthly_sales,
                price: e.price,
                status: e.status,
                img: e.img
            })
        })
        stateApi.setTableData(newTable);
    } else {
        message.error('获取商品失败，请检查问题后重试');
    }

    // 同时获取当前所有的分类，以便添加时选择
    const cate_res = await fetchCategory();
    console.log('所有分类', cate_res);

    // 处理分类

    if (cate_res.data.code) {
        let newTable = [];
        cate_res.data.data.rows.forEach((e, i) => {
            if (e.grade === 1) {
                e.children = []
                newTable.push({ key: e.category_id, name: e.category_name, children: e.children, ...e })
            };
        })
        cate_res.data.data.rows.forEach((e, i) => {
            if (e.grade === 2) {
                newTable.forEach((item) => {
                    if (item.category_name === e.belong) item.children.push({ key: e.category_id, name: e.category_name, ...e })
                })
            }
        })

        stateApi.setCategories(newTable);
    } else {
        message.error('获取分类失败，请检查问题后重试');
    }

}

// 处理图片本地上传
export const handleUploadChange = async (e) => {

    if (e.fileList.length > 0) {
        stateApi.setHasImg(true);
    } else {
        stateApi.setHasImg(false);
        curImg = null;
    }
}

// 图片本地上传前的处理
export const handleBeforeUpload = async (info) => {
    curImg = info;
}

// 上传图片到服务器获取图片地址
const getImgUploaded = async () => {
    console.log('图片file：', curImg);
    let form = new FormData();
    form.append("file", curImg);
    const res = await uploadImg(form);
    console.log('上传图片:', res);
    if (res.data.code) {
        return res.data.data;
    } else {
        message.error('上传图片失败');
        return false;
    }
}