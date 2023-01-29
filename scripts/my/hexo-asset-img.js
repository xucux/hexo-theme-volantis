

// const log = require('hexo-log')({ 'debug': false, 'slient': false });


function isMd(data) {
    let source = data.source;
    return new String(source).toLowerCase().endsWith('md')
}

function action(data) {
    let reverseSource = data.source.split("").reverse().join("");
    let fileName = reverseSource.substring(3, reverseSource.indexOf("/")).split("").reverse().join("");

    // ![example](postname/example.jpg)  -->  {% asset_img example.jpg example %}
    let regExp = RegExp("!\\[(.*?)\\]\\(" + fileName + '/(.+?)\\)', "g");
    // hexo g
    data.content = data.content.replace(regExp, "{% asset_img $2 $1 %}","g");

    console.log(`hexo-asset-img: filename: ${fileName}, title: ${data.title.trim()}`);
    
    return data;
}

/**
 * 
 * 兼容 post_asset_folder: true 中的文件配置
 * 使图片能够在typroa中和文章中都能显示
 * 
 * @see: https://github.com/yiyungent/hexo-asset-img/blob/main/index.js
 * 
 */
hexo.extend.filter.register('before_post_render',(data)=>{
    if(isMd(data)){
        action(data)
    }
}, -1000);