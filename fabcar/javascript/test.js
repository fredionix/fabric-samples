async function main() {
    const record = {
        id: 'filename1',
        type: 'Macquarie',
        subtype: 'CSA',
        data: {
            PartyCompany : [
                {
                    Name : 'PT. Global Currency',
                    Party : 'A'
                },
                {
                    Name : 'Hitechno IT',
                    Party : 'B'
                },
            ],
            ThresholdPartyA : [{
                Amount : 1000,
                Currency : 'USD',
                SPRatings : 'N/A',
                MoodysRatings : 'N/A',
                OtherInfo : 'N/A.'
            },
            {
                Amount : 2000,
                Currency : 'USD',
                SPRatings : 'Aa',
                MoodysRatings : 'N/A',
                OtherInfo : 'N/A.'
            }
            ],
            ThresholdPartyB : [{
                Amount : 1500,
                Currency : 'USD',
                SPRatings : 'N/A',
                MoodysRatings : 'N/A',
                OtherInfo : 'N/A.'
            }],
            MTAPartyA : [{
                Amount : 2000,
                Currency : 'USD',
                SPRatings : 'N/A',
                MoodysRatings : 'N/A',
                OtherInfo : 'N/A.'

            }],
            MTAPartyB : [{
                Amount : 2000,
                Currency : 'USD',
                SPRatings : 'N/A',
                MoodysRatings : 'N/A',
                OtherInfo : 'N/A.'
            }],
            InterestRate :[{
                InterestRateCategory : 'FEDERAL FUND',
                Currency : 'USD'
            }],
            BaseCurrency :'EUR',
            
        },
        status: 'UNVALIDATED',
    }

     await authentication(record.data.PartyCompany);
}

async function authentication(data){
    console.log(data);
    console.log(data[1]["Party"]);
   x =  data[0]["Name"];
   console.log(x);
}

main();