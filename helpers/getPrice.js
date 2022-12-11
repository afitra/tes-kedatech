function getPrice(rate,num,data) {
    if(data == undefined){
        data = {
            // year:0,
            // month:0,
            day:0,
            hour:0,
            minute:0,
            second:0
        }
    }

    for (let i = num; i > 0 ; i--) {
  
            data.second +=1
        
        if(data.second == 60){
            data.minute += 1
            data.second = 0
        }
        if(data.minute == 60) {
            data.hour += 1
            data.minute = 0
        }
        if(data.hour == 24) {
            data.day += 1
            data.hour = 0
        }
        // if(data.day == 30){
        //     data.month += 1
        //     data.day = 0
        // }
        // if(data.month == 12){
            
        //     data.year += 1
        //     data.month = 0
        // }    
    }

    var price = 0
    price += data.day * rate.rate_day
    price += data.hour * rate.rate_hour
    console.log(data);
    if(data.minute>=1){
        price += rate.rate_hour

    }
    return price
}

  /* Fungsi formatRupiah */
  function formatRupiah(angka, prefix){
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
  }
module.exports = {
    getPrice,formatRupiah
}