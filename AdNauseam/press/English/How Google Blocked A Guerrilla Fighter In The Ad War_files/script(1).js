dfp.bidTimeout = 1200; //milliseconds
dfp.floor = 1.00; //dollars

dfp.bids = [
	{
	    bidder: "rubicon",
	    params: {
	    	accountId: "12736",
	    	siteId: "50970",
	    	zoneId: "612400"
	    }
	},
	{
		bidder: "districtmDMX",
		params: {
			id: "148011"
		}
	},
	{
		bidder: "appnexus",
		params: {
			placementId:  "11087279"
		}
	},
	{
		bidder: "aol",
		params: {
			placement: "",
			network: "9481.1"
		}
	}
];

dfp.lookupTable = {
	aol: {
		"300x250": "4514105",
		"300x600": "4514106",
		"728x90": "4514108",
		// "970x90": "4514107",
		"970x250": "4514109"
	}
};