try {
  amznads.getAds('3135');
  document.write("<script type='text/javascript' id='sas_amazon'>asmi.sas.prtnKeys += ';'+ amznads.getTokens().toString().replace(/,/g , ';')</script>");    
} catch(e) {}