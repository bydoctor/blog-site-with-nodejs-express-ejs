const axios=require('axios');

const tumMakaleleriGetir=async (req,res)=> {
    let sayfalama="";
    let aktifPage=1;
    console.log(req.query.page)
    if(req.query.page){

        sayfalama="page="+ req.query.page;  // * ?page=2
        aktifPage=req.query.page;
    }
    try {
        const blogAPI=await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&'+sayfalama);
        //console.log(blogAPI.headers)
        res.render('./makaleler/index',{makaleler:blogAPI.data,sayfalama:blogAPI.headers,aktifPage:aktifPage});
    }catch (err){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.header)
        res.json({
            mesaj:'Hata çıktı'+err.response.data
        })
    }




}

const tekMakaleGetir=async (req,res)=>{
    const makaleID=req.params.id;
try {
    const tekMakale=await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/'+makaleID)
    res.render('./makaleler/makale',{makale:tekMakale.data});
}catch (err){
    res.json({
        mesaj:'Hata çıktı'+err.response.data
    })
}


}

const aramaYap=async (req,res)=>{


    let aranacakKelime=req.body.search;

    // *aramada türkçe karakter sorunu yüzünden yazdık.
    let combining = /[\u0300-\u036F]/g;
    //console.log(aranacakKelime.normalize('NFKD').replace(combining, ''));
    aranacakKelime = aranacakKelime.normalize('NFKD').replace(combining, '');


    let sayfalama = "";
    let aktifPage = 1;

    if (req.query.page) {
        sayfalama = "page=" + req.query.page;
        aktifPage = req.query.page;
    }

    try {
        const blogAPI=await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search='+aranacakKelime)
        res.render('./makaleler/index',{makaleler:blogAPI.data,sayfalama:blogAPI.headers, aktifPage: aktifPage});
    }catch (err){
        res.json({
            mesaj:'Hata çıktı'+err.response.data
        })
    }


}



module.exports={
    tumMakaleleriGetir,
    tekMakaleGetir,
    aramaYap
}