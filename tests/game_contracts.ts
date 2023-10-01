import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { GameContracts } from "../target/types/game";

describe("game", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GameContracts as Program<GameContracts>;
  const worldAddress = anchor.web3.Keypair.generate();
  const randomPlayer = anchor.web3.Keypair.generate();

  it("World initialized!", async () => {

    const created_at = new BN(Date.now());
    const version = "0.0.1";

    const tx = await program.methods.initializeWorld(version, created_at).accounts({
      world: worldAddress.publicKey,
    }).signers([worldAddress]).rpc();

    const fetchedWorld = await program.account.worldAccount.fetch(
      worldAddress.publicKey
    );

    console.log("Your world: ", fetchedWorld);
    console.log("Your transaction signature: ", tx);
  });

  it("Player initialized!", async () => {

    const created_at = new BN(Date.now());

    const playerData = {
      name: "Jeff",
      position: {
        x: new BN(0),
        y: new BN(0),
      },
      owner: randomPlayer.publicKey,
    } as any;

    const tx = await program.methods.initializePlayer(playerData, created_at).accounts({
      player: randomPlayer.publicKey,
    }).signers([randomPlayer]).rpc();

    const fetchedPLayer = await program.account.playerAccount.fetch(
      randomPlayer.publicKey
    );

    console.log("Your player", fetchedPLayer);
    console.log("Your transaction signature", tx);
  });

  it("Player created!", async () => {

    const tx = await program.methods.createPlayer().accounts({
      player: randomPlayer.publicKey,
      world: worldAddress.publicKey,
    }).rpc();

    const fetchedPLayer = await program.account.playerAccount.fetch(
      randomPlayer.publicKey
    );

    const fetchedWorld = await program.account.worldAccount.fetch(
      worldAddress.publicKey
    );

    console.log("Player in the world :", fetchedWorld.players);
    console.log("Your player: ", fetchedPLayer);
    console.log("Your transaction signature: ", tx);
  });

  it("Player Updated!", async () => {

    const updated_at = new BN(Date.now());
    const position = {
      x: new BN(1),
      y: new BN(1),
    }

    const tx = await program.methods.updatePlayer(position, updated_at).accounts({
      player: randomPlayer.publicKey,
    }).rpc();

    const fetchedPLayer = await program.account.playerAccount.fetch(
      randomPlayer.publicKey
    );

    const fetchedWorld = await program.account.worldAccount.fetch(
      worldAddress.publicKey
    );

    console.log("Your player: ", fetchedPLayer);
    console.log("Your transaction signature: ", tx);
  });

  it("Player Updated!", async () => {

    const updated_at = new BN(Date.now());
    const position = {
      x: new BN(2),
      y: new BN(2),
    }

    const tx = await program.methods.updatePlayer(position, updated_at).accounts({
      player: randomPlayer.publicKey,
    }).rpc();

    const fetchedPLayer = await program.account.playerAccount.fetch(
      randomPlayer.publicKey
    );

    const fetchedWorld = await program.account.worldAccount.fetch(
      worldAddress.publicKey
    );

    console.log("Your player: ", fetchedPLayer);
    console.log("Your transaction signature: ", tx);
  });
});
