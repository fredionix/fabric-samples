/*
 * SPDX-License-Identifier: Apache-2.0
 */

const fetch = require("node-fetch");
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function insertState(docKey) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
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
                        Name : 'Taiger',
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

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
        //const record = {data :"test"};
        
        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //console.log(record["data"]["PartyCompany"][0]["Name"]);
        //console.log(record["data"]["PartyCompany"][1]["Name"]);
        //console.log(record["data"]["MTAValueA"][0]["Amount"]);
        //console.log(record["data"]["MTAValueB"][0]["Amount"]);
        //console.log(record["data"]["ThresholdPartyA"][0]["Amount"]);
        //console.log(record["data"]["ThresholdPartyB"][0]["Amount"]);
        //console.log(record["data"]["BaseCurrency"]);
        //console.log(record["data"]["InterestRate"][0]["InterestRateCategory"]);
        //console.log(record["data"]["InterestRate"][0]["Currency"])
        
        //await contract.submitTransaction('changeDocData', 'EXTRACT5',record["data"]["PartyCompany"][0]["Name"],record["data"]["PartyCompany"][1]["Name"],record["data"]["MTAPartyA"][0]["Amount"], record["data"]["MTAPartyA"][0]["Amount"], record["data"]["ThresholdPartyA"][0]["Amount"],record["data"]["ThresholdPartyB"][0]["Amount"], record["data"]["BaseCurrency"],record["data"]["InterestRate"][0]["InterestRateCategory"], record["data"]["InterestRate"][0]["Currency"]);
        //testJSON(record.data.PartyCompany);
        //await contract.submitTransaction('deleteState', 'DOC8');
        
        //await contract.submitTransaction('changeDocStatus', 'EXTRACT111','VALIDATED');
        await contract.submitTransaction('createDoc', docKey, 'Macquarie', 'CSA', 'filename111', record["data"]["PartyCompany"][0]["Name"],record["data"]["PartyCompany"][1]["Name"],record["data"]["MTAPartyA"][0]["Amount"], record["data"]["MTAPartyA"][0]["Amount"], record["data"]["ThresholdPartyA"][0]["Amount"],record["data"]["ThresholdPartyB"][0]["Amount"], record["data"]["BaseCurrency"],record["data"]["InterestRate"][0]["InterestRateCategory"], record["data"]["InterestRate"][0]["Currency"]);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

async function testJSON(record) {
    const test = {
        id: 'filename1',
        type: 'Macquarie',
        subtype: 'CSA',
        data: {
            PartyCompany : [
                {
                    Name : 'PT. AAA',
                    Party : 'C'
                },
                {
                    Name : 'xxx',
                    Party : 'D'
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
    for (let i = 0; i < test["data"]["PartyCompany"].length; i++) {
        test["data"]["PartyCompany"][i]["Name"] = record[i]["Name"];
        test["data"]["PartyCompany"][i]["Party"] = record[i]["Party"];
    }
    
    console.log(test.data);
}


insertState('EXTRACT111');