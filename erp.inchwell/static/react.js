//此处为全局数据
var token = localStorage.getItem('token') || 0

var http = 'http://47.244.175.166:8086/api/'

function retreat(){//撤退
    this.$router.go(-1)
}
var database = {
    look:{
        data:'中央数据库',
        
    },
}