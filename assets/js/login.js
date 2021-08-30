$(function() {
    console.log(5555555555);
    //切换登录和注册
    $('#login-a').on('click', function(){
        $('.login').hide();
        $('.reg').show();
    })
    $('#reg-a').on('click', function(){
        $('.reg').hide();
        $('.login').show();
    })

    // 自定义输入规则 两种写法数组和函数
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        re: function(value) {
            if($('.reg input[name="password"]').val() !== value) {
                return '两次输入密码不一致';
            }
        } 
    })
    // 登录页面ajax
    $('#layui-form').submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            type: 'POST',
            data: data ,
            success: function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                //获得秘钥 存在本地储存
                localStorage.setItem('token',res.token);
                layer.msg("登录成功，正在跳转>>>");
                location.href = '../../index.html';
            }
            
        })
    })
    //注册页面ajax
    $('#reg-form').submit(function(e) {
        e.preventDefault();
        var pw = $(' #reg-form input[name="password"]').val();
        var un = $(' #reg-form input[name="username"]').val();
        $.ajax({
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            type: 'POST',
            data: {
                username: un ,
                password: pw
            },
            success: function(res) {
                console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg("注册成功，请登录");
                $('#reg-a').click();
                
            }
        })

    })

})