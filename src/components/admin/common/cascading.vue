<!--国家地区级联-->
<template>
    <div class="cascading">
    <el-row :gutter="12">
        <el-col :span="3" style="padding-left:0px;">
	        <el-select  placeholder="请选择" @change="selectCountry"  v-model="areasData.countryCode">
	             <el-option v-for="item in country" :label="item.name" :value="item.name"></el-option>
	        </el-select>  
        </el-col>
        <el-col :span="4">
             <el-select  placeholder="请选择" @change="selectProvice" v-model="areasData.province">
             <el-option v-for="item in setCityData.provice.children" :label="item.name" :value="item.name"></el-option>
             </el-select>  
        </el-col>
        <el-col :span="4">
            <el-select  placeholder="请选择"  @change="selectCity" v-model="areasData.city">
               <el-option v-for="item in setCityData.city.children" :label="item" :value="item"></el-option>
             </el-select>  
        </el-col>
                    
    </div>
</template>
<script>

	export default {
		data(){
			return {
               country:[
                  {name:"中国",children:[
							{ name:"安徽省",children:["安庆", "蚌埠", "巢湖", "池州", "滁州", "阜阳", "合肥", "淮北", "淮南", "黄山", "六安", "马鞍山", "宿州", "铜陵", "芜湖", "宣城", "亳州"]}, 
							{ name:"北京市",children:["北京市"]}, 
							{ name:"福建省",children:["福州", "龙岩", "南平", "宁德", "莆田", "泉州", "三明", "厦门", "漳州"]}, 
							{ name:"甘肃省",children:["白银", "定西", "甘南藏族自治州", "嘉峪关", "金昌", "酒泉", "兰州", "临夏回族自治州", "陇南", "平凉", "庆阳", "天水", "武威", "张掖"]}, 
							{ name:"广东省",children:["潮州", "东莞", "佛山", "广州", "河源", "惠州", "江门", "揭阳", "茂名", "梅州", "清远", "汕头", "汕尾", "韶关", "深圳", "阳江", "云浮", "湛江", "肇庆", "中山", "珠海"]}, 
							{ name:"广西壮族自治区",children:["百色", "北海", "崇左", "防城港", "桂林", "贵港", "河池", "贺州", "来宾", "柳州", "南宁", "钦州", "梧州", "玉林"]}, 
							{ name:"贵州省",children:["安顺", "毕节", "贵阳", "六盘水", "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "铜仁", "遵义"]}, 
							{ name:"海南省",children:["白沙黎族自治县", "保亭黎族苗族自治县", "昌江黎族自治县", "澄迈县", "定安县", "东方", "海口", " 乐东黎族自治县", "临高县", "陵水黎族自治县", "琼海", "琼中黎族苗族自治县", "三亚", "屯昌县", "万宁", "文昌", "五指山", "儋州"]}, 
							{ name:"河北省",children:["保定", "沧州", "承德", "邯郸", "衡水", "廊坊", "秦皇岛", "石家庄", "唐山", "邢台", "张家口"]}, 
							{ name:"河南省",children:["安阳", "鹤壁", "济源", "焦作", "开封", "洛阳", "南阳", "平顶山", "三门峡", "商丘", "新乡", "信阳", "许昌", "郑州", "周口", "驻马店", "漯河", "濮阳"]}, 
							{ name:"黑龙江",children:["大庆", "大兴安岭", "哈尔滨", "鹤岗", "黑河", "鸡西", "佳木斯", "牡丹江", "七台河", "齐齐哈尔", "双鸭山", "绥化", "伊春"]}, 
							{ name:"湖北省",children:["鄂州", "恩施土家族苗族自治州", "黄冈", "黄石", "荆门", "荆州", "潜江", "神农架林区", "十堰", "随州", "天门", "武汉", "仙桃", "咸宁", "襄樊", "孝感", "宜昌"]}, 
							{ name:"湖南省",children:["常德", "长沙", "郴州", "衡阳", "怀化", "娄底", "邵阳", "湘潭", "湘西土家族苗族自治州", "益阳", "永州", "岳阳", "张家界", "株洲"]}, 
							{ name:"吉林省",children:["白城", "白山", "长春", "吉林", "辽源", "四平", "松原", "通化", "延边朝鲜族自治州"]}, 
							{ name:"江苏省",children:["常州", "淮安", "连云港", "南京", "南通", "苏州", "宿迁", "泰州", "无锡", "徐州", "盐城", "扬州", "镇江"]}, 
							{ name:"江西省",children:["抚州", "赣州", "吉安", "景德镇", "九江", "南昌", "萍乡", "上饶", "新余", "宜春", "鹰潭"]}, 
							{ name:"辽宁省",children:["鞍山", "本溪", "朝阳", "大连", "丹东", "抚顺", "阜新", "葫芦岛", "锦州", "辽阳", "盘锦", "沈阳", "铁岭", "营口"]},
							{ name:"内蒙古",children:["阿拉善盟", "巴彦淖尔盟", "包头", "赤峰", "鄂尔多斯", "呼和浩特", "呼伦贝尔", "通辽", "乌海", "乌兰察布盟", "锡林郭勒盟", "兴安盟"]},
							{ name:"宁夏",children:["固原", "石嘴山", "吴忠", "银川"]}, 
							{ name:"青海",children:["果洛藏族自治州", "海北藏族自治州", "海东", "海南藏族自治州", "海西蒙古族藏族自治州", "黄南藏族自治州", "西宁", "玉树藏族自治州"]}, 
							{ name:"山东省",children:["滨州", "德州", "东营", "菏泽", "济南", "济宁", "莱芜", "聊城", "临沂", "青岛", "日照", "泰安", "威海", "潍坊", "烟台", "枣庄", "淄博"]}, 
							{ name:"山西省",children:["长治", "大同", "晋城", "晋中", "临汾", "吕梁", "朔州", "太原", "忻州", "阳泉", "运城"]}, 
							{ name:"陕西省",children:["安康", "宝鸡", "汉中", "商洛", "铜川", "渭南", "西安", "咸阳", "延安", "榆林"]}, 
							{ name:"上海市",children:["上海"]}, 
							{ name:"四川",children:["阿坝藏族羌族自治州", "巴中", "成都", "达州", "德阳", "甘孜藏族自治州", "广安", "广元", "乐山", "凉山彝族自治州", "眉山", "绵阳", "南充", "内江", "攀枝花", "遂宁", "雅安", "宜宾", "资阳", "自贡", "泸州"]}, 
							{ name:"天津省",children:["天津"]}, 
							{ name:"西藏",children:["阿里", "昌都", "拉萨", "林芝", "那曲", "日喀则", "山南"]}, 
							{ name:"新疆",children:["阿克苏", "阿拉尔", "巴音郭楞蒙古自治州", "博尔塔拉蒙古自治州", "昌吉回族自治州", "哈密", "和田", "喀什", "克拉玛依", "克孜勒苏柯尔克孜自治州", "石河子", "图木舒克", "吐鲁番", "乌鲁木齐", "五家渠", "伊犁哈萨克自治州"]}, 
							{ name:"云南省",children:["保山", "楚雄彝族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "迪庆藏族自治州", "红河哈尼族彝族自治州", "昆明", "丽江", "临沧", "怒江傈傈族自治州", "曲靖", "思茅", "文山壮族苗族自治州", "西双版纳傣族自治州", "玉溪", "昭通"]}, 
							{ name:"浙江省",children:["杭州", "湖州", "嘉兴", "金华", "丽水", "宁波", "绍兴", "台州", "温州", "舟山", "衢州"]}, 
							{ name:"重庆市",children:["重庆市"]}
                  ]},
                  {name:"韩国",children:[
                            {name:"汉城特別市",children:["汉城"]}, 
							{name:"釜山广域市",children:["釜山", "机张郡"]}, 
							{name:"大邱广域市",children:["大邱", "达城郡"]}, 
							{name:"仁川广域市",children:["仁川", "江华郡", "瓮津郡"]}, 
							{name:"光州广域市",children:["光州"]}, 
							{name:"大田广域市",children:["大田"]}, 
							{name:"蔚山广域市",children:["蔚山", "蔚州郡"]}, 
							{name:"京畿道",children:["水原市", "城南市", "安山市", "高阳市", "安养市", "富川市"]}, 
							{name:"江原道",children:["春川市", "原州市", "江陵市"]}, 
							{name:"忠清北道",children:["清州市"]}, 
							{name:"忠清南道",children:["天安市"]}, 
							{name:"全罗北道",children:["全州市", "群山市", "益山市"]}, 
							{name:"全罗南道",children:["木浦市", "丽水市", "顺天市"]}, 
							{name:"庆尚北道",children:["浦项市", "龟尾市", "庆州市"]}, 
							{name:"庆尚南道",children:["昌原市", "马山市", "晋州市"]}, 
							{name:"济州道",children:["济州市", "西归浦市", "北济州郡", "南济州郡"]}
                  ]},
                  { name:"日本",children:[
                            {name:"东京都",children:["东京"]}, 
							{name:"神奈川县",children:["横滨市"]}, 
							{name:"大阪府",children:["大阪市"]}, 
							{name:"爱知县",children:["名古屋市"]}, 
							{name:"北海道",children:["札幌市"]}, 
							{name:"兵库县",children:["神戸市"]}, 
							{name:"京都府",children:["京都市"]}, 
							{name:"福冈县",children:["福冈市"]}, 
							{name:"神奈川县",children:["川崎市"]}, 
							{name:"广岛县",children:["埼玉市"]}, 
							{name:"宫城县",children:["仙台市"]},
							{name:"福冈县",children:["北九州市"]}, 
							{name:"千叶县",children:["千叶市"]}, 
                  ]},
                  // { name:"新加坡",children:[]}, 
                  // { name:"马来西亚",children:[]}, 
                  // { name:"菲律宾",children:[]}, 
                  // { name:"沙特阿拉伯",children:[]}, 
                  // { name:"朝鲜",children:[]}, 
                  // { name:"越南",children:[]}, 
                  // { name:"缅甸",children:[]}, 
                  // { name:"德国",children:[]},    
                  // { name:"英国",children:[]},
                  // { name:"法国",children:[]},
                  // { name:"爱尔兰",children:[]},
                  // { name:"波兰",children:[]},
                  // { name:"西班牙",children:[]},
                  // { name:"意大利",children:[]},
                  // { name:"俄罗斯",children:[]},
                  // { name:"荷兰",children:[]},
                  // { name:"美国",children:[]},
                  // { name:"加拿大",children:[]},
                  // { name:"巴西",children:[]},
                  // { name:"阿根廷",children:[]},
                  // { name:"新西兰",children:[]},
                  // { name:"澳大利亚",children:[]},
                  // { name:"印度",children:[]},
                  // { name:"埃及",children:[]}
               ],
               setCityData:{
               	  country:{},
                  provice:{},
                  city:[] 
               },
               areasData:{} 
			}
		},
        props:["areasDataIn"],
		watch:{
            "areasData.countryCode":{
                handler(val,oldVal){
                	if(val == oldVal){  return false; }
                	this.setCityData.provice ={};
                	this.setCityData.city =[];
                    this.setCityData.provice = this.country.filter((item)=>{
		             	 return item.name == val;
		            })[0];
		            if(oldVal != undefined){
		            	 this.areasData.province =  this.setCityData.provice.children[0].name;
		            }
                },
                deep:false  // 深度观察
           },
           "areasData.province":{
                handler(val,oldVal){
                	if(val == oldVal){ return false; }
                    this.setCityData.city = this.setCityData.provice.children.filter((item)=>{
		             	  return item.name == val;
		             })[0];
                    // this.areasData.city =  this.areasData.city || this.setCityData.city.children[0];
                     if(oldVal != undefined){
		            	this.areasData.city =  this.setCityData.city.children[0];
		            }
                },
                deep:false  // 深度观察
           }
		},
		methods:{
			selectCountry(val){
				this.areasData.countryCode = val;
				this.$emit("childChange",this.areasData); 
			},
			selectProvice(val){
				this.areasData.province = val;
				this.$emit("childChange",this.areasData); 
			},
			selectCity(val){
				this.areasData.city = val;
				this.$emit("childChange",this.areasData); 
			},
		},
		mounted() {
			 this.areasData = this.areasDataIn;
             this.setCityData.country = this.country.filter((item)=>{
             	     return item.name == this.areasData.countryCode;
             })[0];
             this.setCityData.provice = this.setCityData.country.children.filter((item)=>{
             	     return item.name == this.areasData.province;
             })[0];
             this.setCityData.city = this.setCityData.provice.children.filter((item)=>{
             	  return item.name == this.areasData.city;
             })[0];
		},
		beforeCreate(){
           
		}
	}
</script>

