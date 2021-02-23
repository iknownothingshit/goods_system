const { override, fixBabelImports, addLessLoader } = require('customize-cra');

// 实现antd组件的按需打包
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        librarydDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#0080FF' }
        }
    })
);  