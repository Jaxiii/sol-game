use anchor_lang::prelude::*;

declare_id!("HFAYdSKLLVmbctEMU1fNx4nZ4a8vNFfjNacf4bjuQSiS");

#[program]
pub mod game {
    use super::*;

    pub fn initialize_world(ctx: Context<InitializeWorld>, version: String, created_at: u64) -> Result<()> {
        let world_account: &mut Account<'_, WorldAccount>  = &mut ctx.accounts.world;  
        let owner_account: &mut Signer<'_> = &mut ctx.accounts.owner; 

        world_account.version = version;
        world_account.created_at = created_at;
        world_account.updated_at = created_at;
        world_account.players = [].to_vec();
        world_account.owner = owner_account.key();

        msg!("World initialized");
        Ok(())
    }

    pub fn initialize_player(ctx: Context<InitializePlayer>, player: PlayerData, created_at: u64) -> Result<()> {
        let player_account: &mut Account<'_, PlayerAccount>  = &mut ctx.accounts.player;  
        let owner_account: &mut Signer<'_> = &mut ctx.accounts.owner; 

        player_account.name = player.name;
        player_account.position = player.position;
        player_account.created_at = created_at;
        player_account.updated_at = created_at;
        player_account.owner = owner_account.key();

        msg!("Player initialized");
        Ok(())
    }

    pub fn create_player(ctx: Context<CreatePlayer>) -> Result<()> {
        let world_account: &mut Account<'_, WorldAccount>  = &mut ctx.accounts.world;  
        let player_account: &mut Account<'_, PlayerAccount>  = &mut ctx.accounts.player;  

        world_account.players.push(player_account.key());

        msg!("Player created");
        Ok(())
    } 

    pub fn update_player(ctx: Context<UpdatePlayer>, position: PositionData, updated_at: u64) -> Result<()> {
        let player_account: &mut Account<'_, PlayerAccount>  = &mut ctx.accounts.player;  

        player_account.position = position;
        player_account.updated_at = updated_at;

        msg!("Player updated");
        Ok(())
    }


}

#[derive(Accounts)]
pub struct InitializeWorld<'info> {
    #[account(init, payer = owner, space = 8 + 96)]
    pub world: Account<'info, WorldAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct WorldAccount {
    pub version: String,
    pub players: Vec<Pubkey>,
    pub owner: Pubkey,
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(Accounts)]
pub struct InitializePlayer<'info> {
    #[account(init, payer = owner, space = 8 + 232)]
    pub player: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePlayer<'info> {
    #[account(mut)]
    pub world: Account<'info, WorldAccount>,
    #[account(mut)]
    pub player: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePlayer<'info> {
    #[account(mut)]
    pub player: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account]
pub struct PlayerAccount {
    pub name: String,
    pub position: PositionData,
    pub owner: Pubkey,
    pub created_at: u64,
    pub updated_at: u64,
}


#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct PlayerData {
    pub name: String,
    pub position: PositionData,
    pub owner: Pubkey,
    pub created_at: u64,
    pub updated_at: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct PositionData {
    pub x: u64,
    pub y: u64,
}



