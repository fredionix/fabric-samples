/*
 * SPDX-License-Identifier: Apache-2.0
 */


const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim-api').ClientIdentity; 
class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                id: 'filename1',
                type: 'Macquarie',
                subtype: 'CSA',
                data: {
                    PartyCompany : [
                        {
                            Name : 'Macquarie Bank Limited',
                            Party : 'A'
                        },
                        {
                            Name : 'ISRAMCO',
                            Party : 'B'
                        },
                    ],
                    ThresholdPartyA : [{
                        Amount : 1000,
                        Currency : 'USD',
                        SPRatings : 'N/A',
                        MoodysRatings : 'N/A',
                        OtherInfo : 'N/A.'
                    }],
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
                    BaseCurrency :'USD',
                    
                },
                status: 'ISSUED',
                sanityChecked: false,

            },
            
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'extract';
            await ctx.stub.putState('EXTRACT' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryDoc(ctx, docKey) {
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        console.log(docAsBytes.toString());
        return docAsBytes.toString();
    }

    async createDoc(ctx, docKey, type, subtype, id, PartyCompanyA, PartyCompanyB, MTAPartyA, MTAPartyB, ThresholdPartyA, ThresholdPartyB, BaseCurrency, InterestRateCategory, InterestRateCurrency) {
        console.info('============= START : Create Car ===========');
        //const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        //if (!docAsBytes || docAsBytes.length === 0) {
            //throw new Error(`${docKey} does not exist`);
            // make the structure
            const doc = {
                id,
                docType: 'extract',
                type,
                subtype,
                data : {
                    PartyCompany : [
                        {
                            Name : PartyCompanyA,
                            Party : 'A'
                        },
                        {
                            Name : PartyCompanyB,
                            Party : 'B'
                        },
                    ],
                    ThresholdPartyA : [{
                        Amount : ThresholdPartyA,
                        Currency : 'USD',
                        SPRatings : 'N/A',
                        MoodysRatings : 'N/A',
                        OtherInfo : 'N/A.'
                    }],
                    ThresholdPartyB : [{
                        Amount : ThresholdPartyB,
                        Currency : 'USD',
                        SPRatings : 'N/A',
                        MoodysRatings : 'N/A',
                        OtherInfo : 'N/A.'
                    }],
                    MTAPartyA : [{
                        Amount : MTAPartyA,
                        Currency : 'USD',
                        SPRatings : 'N/A',
                        MoodysRatings : 'N/A',
                        OtherInfo : 'N/A.'

                    }],
                    MTAPartyB : [{
                        Amount : MTAPartyB,
                        Currency : 'USD',
                        SPRatings : 'N/A',
                        MoodysRatings : 'N/A',
                        OtherInfo : 'N/A.'
                    }],
                    InterestRate :[{
                        InterestRateCategory : InterestRateCategory,
                        Currency : InterestRateCurrency
                    }],
                    BaseCurrency :BaseCurrency,
                    
                },
                status: 'ISSUED',
                sanityChecked: false,
            };
            await ctx.stub.putState(docKey, Buffer.from(JSON.stringify(doc)));
            
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = 'EXTRACT0';
        const endKey = 'EXTRACT999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeDocData(ctx, docKey, PartyCompanyA, PartyCompanyB, MTAValueA, MTAValueB, ThresholdPartyA, ThresholdPartyB, BaseCurrency, InterestRateCategory, InterestRateCurrency){
        console.info('============= START : changeDocdata ===========');
        // take the string get by key
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        doc["data"]["PartyCompany"][0]["Name"] = PartyCompanyA;
        doc["data"]["PartyCompany"][0]["Party"] = "A";
        doc["data"]["PartyCompany"][1]["Name"] = PartyCompanyB;
        doc["data"]["PartyCompany"][1]["Party"] = "B";
        doc["data"]["MTAPartyA"][0]["Amount"] = MTAValueA;
        doc["data"]["MTAPartyB"][0]["Amount"] = MTAValueB;
        doc["data"]["ThresholdPartyA"][0]["Amount"] = ThresholdPartyA;
        doc["data"]["ThresholdPartyB"][0]["Amount"] = ThresholdPartyB;
        doc["data"]["BaseCurrency"] = BaseCurrency;
        doc["data"]["InterestRate"][0]["InterestRateCategory"] = InterestRateCategory;
        doc["data"]["InterestRate"][0]["Currency"] = InterestRateCurrency;
        
        //put state with the same car number in this case it will be overwritten but the changing recorded in the ledger
        await ctx.stub.putState(docKey, Buffer.from(JSON.stringify(doc)));
        console.info('============= END : changeDocdata ===========');
    }

    async changeDocStatus(ctx, docKey, newStatus) {
        console.info('============= START : changeDocStatus ===========');
        // take the string get by key
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        //temper the json created with new data
        if (doc.status === "VALIDATED") {
            throw new Error(`${docKey} already validated by qa`);
        }

        if (doc.status === "CONFIRMED") {
            throw new Error(`${docKey} already confirmed by client`);
        }

        //let MSPID = await ctx.stub.getCreator().toString();
        doc.status = newStatus;
        await ctx.stub.putState(docKey, Buffer.from(JSON.stringify(doc)));

        console.info('============= END : changeDocStatus ===========');
    }

    async changeDocConfirmed(ctx, docKey, newStatus) {
        console.info('============= START : changeDocStatus ===========');
        // take the string get by key
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        //temper the json created with new data
        if (doc.status === "ISSUED") {
            throw new Error(`${docKey} need to be validated first by QA`);
        }

        if (doc.status === "CONFIRMED") {
            throw new Error(`${docKey} already confirmed by client`);
        }

        //let MSPID = await ctx.stub.getMspID().toString();
        doc.status = newStatus;
        //if (MSPID === "Org1MSP"){
        await ctx.stub.putState(docKey, Buffer.from(JSON.stringify(doc)));

        console.info('============= END : changeDocStatus ===========');
    }


    async changeSC(ctx, docKey) {
        console.info('============= START : changeDocStatus ===========');
        // take the string get by key
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        //temper the json created with new data
        // need to check version of deployment of the project, so when the deployment has been change it will make the sanity check is false again
        if(doc.sanityChecked){
            throw new Error(`${docKey} this doc already sanity checked`);
        }
        
        doc.sanityChecked = true;
        await ctx.stub.putState(docKey, Buffer.from(JSON.stringify(doc)));

        console.info('============= END : changeDocStatus ===========');
    }

    async deleteState(ctx, docKey) {
        console.info('============= START : deleteState ===========');
        const carAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        ctx.stub.deleteState(docKey);
        console.info('============= END : deleteState ===========');
    }

    async getHistory(ctx, docKey) {
        console.info('============= START : getHistory ===========');
        const docAsBytes = await ctx.stub.getState(docKey); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docKey} does not exist`);
        }
        
        const allResults = [];
        for await (const {key, value} of ctx.stub.getHistoryForKey(docKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);

        console.info('============= END : getHistory ===========');
    }

}

module.exports = FabCar;
