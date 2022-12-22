import { CronJob } from 'cron';
import { GameResult, PlayResult } from '../../presentation/protocols/play-result';
import { SendMessageDiscord } from '../../presentation/service/sendDiscordMessage';
import { DiscordEmbed } from '../../utils/discord/embed';

const cron = (time: string, playResult: PlayResult): CronJob => {
  console.log('run Cron');
  return new CronJob(
    time,
    async () => {
      const { isSuccess, data, guilds } = await playResult.play();
      if (isSuccess) {
        const result = data as GameResult;
        const discordEmbed = new DiscordEmbed();
        const sendMessageDiscord = new SendMessageDiscord(discordEmbed);

        sendMessageDiscord.send(result, guilds);
        return;
      }

      console.log('Add error log');
    },
    null,
    true,
    'America/Sao_Paulo'
  );
};

export default cron;
