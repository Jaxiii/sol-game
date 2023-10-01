// const provider = anchor.AnchorProvider.env();
// anchor.setProvider(provider);

// const program = anchor.workspace.GameContracts;
// const randomPlayer = web3.Keypair.generate();

// // Assuming you have set up the Solana connection and the program
// async function fetchAndUpdatePlayerPosition() {
//     // Fetch the player's data from Solana
//     const fetchedPlayer = await program.account.playerAccount.fetch(randomPlayer.publicKey);

//     // Update the displayed position
//     document.getElementById("x-pos").textContent = fetchedPlayer.x;
//     document.getElementById("y-pos").textContent = fetchedPlayer.y;
// }

// // Call the function on page load
// window.onload = fetchAndUpdatePlayerPosition;
