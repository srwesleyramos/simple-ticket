import Listener from "../interfaces/Listener";
import Sectors from "../controllers/SectorController";

import {
    ActionRowBuilder,
    Client,
    Interaction,
    ModalBuilder,
    StringSelectMenuInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

export default class SelectEvent extends Listener {

    constructor(client: Client) {
        super(client, 'interactionCreate');
    }

    async execute(interaction: Interaction) {
        if (!(interaction instanceof StringSelectMenuInteraction)) {
            return;
        }

        if (interaction.customId === 'create-ticket') {
            const sector = Sectors.getSectorById(interaction.values[0]);

            if (!sector) {
                return;
            }

            const modal = new ModalBuilder()
                .setCustomId(`create-ticket:${sector.id}`)
                .setTitle(sector.label)
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId('reason')
                                .setLabel("Descreva o seu problema")
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(12)
                                .setMaxLength(32) as any
                        ) as any
                );

            await interaction.showModal(modal);
        }

        if (interaction.customId === 'change-sector') {
            const sector = Sectors.getSectorById(interaction.values[0]);

            if (!sector) {
                return;
            }

            const modal = new ModalBuilder()
                .setCustomId(`change-sector:${sector.id}`)
                .setTitle(sector.label)
                .addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(
                            new TextInputBuilder()
                                .setCustomId('reason')
                                .setLabel("Descreva o seu problema")
                                .setStyle(TextInputStyle.Short)
                                .setMinLength(12)
                                .setMaxLength(32) as any
                        ) as any
                );

            await interaction.showModal(modal);
        }
    }
}