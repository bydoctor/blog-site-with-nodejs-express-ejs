const express=require('express');
const app=express();
const ejs=require('ejs')
const expressLayouts=require('express-ejs-layouts');
const path=require('path');
const blogRouter=require('./src/routers/blogRouter')

app.use(express.static(path.join(__dirname, 'public')))
//app.use(express.static('public')); // public i böyle yapmalıyız.link sonuna ../public şeklinde bir kullanım uygun değil.
//public içindeki dosyalara ../deneme.txt şeklinde erişim sağlayabiliriz.Bir rotaya istek bulunmuyoruz direk dosya olarak sunuyor.
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'./src/views'));

app.use(express.urlencoded({extended: true})); //formdan gönderilen verileri anlaması için.

app.use('/blog',blogRouter);
app.use('/',blogRouter);





app.listen(3000,()=>{
    console.log(' Server 3000 portundan ayaklandı')
})