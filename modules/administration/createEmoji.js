/**
 * @file createEmoji command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.url || !/^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i.test(args.url) || !args.name) {
    /**
     * The command was ran with invalid parameters.
     * @fires commandUsage
     */
    return Bastion.emit('commandUsage', message, this.help);
  }

  try {
    let emoji = await message.guild.createEmoji(args.url, args.name.join('_'));

    await message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        title: 'Emoji Created',
        fields: [
          {
            name: 'Emoji Name',
            value: emoji.name,
            inline: true
          },
          {
            name: 'Creator',
            value: message.author.tag,
            inline: true
          }
        ],
        thumbnail: {
          url: emoji.url
        }
      }
    });
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'url', type: String, defaultOption: true },
    { name: 'name', type: String, alias: 'n', multiple: true }
  ]
};

exports.help = {
  name: 'createEmoji',
  botPermission: 'MANAGE_EMOJIS',
  userTextPermission: 'MANAGE_EMOJIS',
  userVoicePermission: '',
  usage: 'createEmoji <EmojiURL> -n <EmojiName>',
  example: [ 'createEmoji https://bastionbot.org/assets/images/bastion.png -n BastionBot' ]
};
