document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded! 🚀');
    // Define some elements
    const connectWalletBtn = document.getElementById('connectWallet');
    const disconnectWalletBtn = document.getElementById('disconnectWallet');
    const sendSOLBtn = document.getElementById('sendSOL');

    // // Connection and wallet details
    // const network = 'devnet';  // or 'testnet', 'mainnet-beta'
    // const endpoint = solanaWeb3.ClusterApiUrl(network);
    const connection = new solanaWeb3.Connection("http://localhost:8899");

    let wallet;  // Initialize your wallet connection here

    // Connect wallet logic
    connectWalletBtn.addEventListener('click', async () => {
        console.log('Connecting wallet...');

        try {
            await window.phantom.solana.connect();
            // Handle post-connection logic
            console.log('Wallet connected!');
            connectWalletBtn.hidden = true;
            disconnectWalletBtn.hidden = false;
            sendSOLBtn.disabled = false;
        } catch (error) {
            console.error('Failed to connect to Phantom Wallet:', error);
        }
        
    });

    // Disconnect wallet logic
    disconnectWalletBtn.addEventListener('click', () => {
        // Disconnect wallet and update buttons' visibility
        // NOTE: You'll have to implement the actual disconnection logic based on the wallet you use.
        connectWalletBtn.hidden = false;
        disconnectWalletBtn.hidden = true;
        sendSOLBtn.disabled = true;
    });

    // Send SOL logic
    sendSOLBtn.addEventListener('click', async () => {
        if (!wallet || !wallet.publicKey) {
            alert('Wallet not connected!');
            return;
        }

        const lamports = await connection.getMinimumBalanceForRentExemption(0);
        const transaction = solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: solanaWeb3.Keypair.generate().publicKey,
                lamports,
            })
        );

        // Sending the transaction logic goes here...

    });
});
