const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'S', logoType: 'text', url: 'https://stackoverflow.com/'}
]
// console.log(hashMap)
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon">
                            <use xlink:href="#icon-cclose"></use>
                        </svg>
                    </div>
                </div>
            </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //组织冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    });
}
render();

$('.addButton').on('click', () => {
    let url = window.prompt('请问您想要添加的网址是？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render()
})


window.onbeforeunload = () => {
    // console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    // console.log(typeof hasMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    window.localStorage.setItem('x', string)
}

$(document).on('keypress',(e)=>{
    const {key} = e
    // const key = e.key
    for (let i = 0;i < hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})
        