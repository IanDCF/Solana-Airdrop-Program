//Import the required modules that 
//will be used for creating an airdrop program.
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,   //Allows us to create a new wallet.
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

//Generate new wallet keypair -> declare object newPair of type Keypair.
//const newPair = new Keypair(); 
//console.log(newPair);

//Extract public key from aaccountinfo and store it
//in variable: myPubilcKey of type string.
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
console.log(publicKey);
//Extract private key from accountinfo and store it in
//new variable: mySecretKey of type Uint8Array length 64.
const secretKey = newPair._keypair.secretKey;
console.log(secretKey);
//Use public and private key to print out wallet balance
//by using: getBalance method inside the connection class we imoprted.
//Create function signature:
const getWalletBalance = async() => {
    try {
        // Add functionality to getWalletBalance by creating a connection
        // object that will be used to get the balance.
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //Create wallet object from mySecretKey.
        const myWallet = await Keypair.fromSecretKey(secretKey);
        //Query the balance of myWallet.
        const walletBalance = await connection.getBalance(
          new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${publicKey}`);
        console.log(` Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
        console.log(err);
    }
};

//Create function that airdrops SOL into wallet.
const airDropSol = async() => {
    try {
        //Create connection object and walletKeyPair object.
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        //Create airdrop signature using wallet details and amount of SOL (max 2SOL).
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        //Await confirmtion for the transaction from the network.
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err) {
        console.log(err);
    }
} 

//Test functions by creating a driver function
const driverFunction = async() => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();