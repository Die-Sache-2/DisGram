# DisGram
## Schritt für Schritt Anleitung
Der Bot wird bereits im Internet gehostet und mit folgender Schritt für Schritt Anleitung kann man ihn nutzen, um Discord
Kanäle in Telegram Kanälen zu abonnieren. Der Bot ist mit einem Registrierungstoken geschützt und ohne diesen Token kann 
man ihn nicht nutzen, aber jedem steht es frei den Bot selbst zu hosten. 
1. Füge den Bot deinem Discord Server hinzu indem du auf [diesen Link](https://discordapp.com/oauth2/authorize?&client_id=1011564192182046780&scope=bot&permissions=2147486720) klickst und den Anweisungen folgst.
2. Füge [diesen Bot](https://t.me/DisGram_die_sache_bot) deinem Telegram Kanal hinzu.
3. Geh auf deinen Discord Server in irgendeinen Discord Kanal oder starte einen privaten Chat mit dem DisGram Bot auf Discord und registriere deinen Discord User mit dem Befehl `/disgram register token <Registrierungstoken>`
4. Mache deinen Kanal abonnierbar indem du den Befehl `/disgram set id <identifier>` eingibst. Der Identifier wird verwendet, um auf Telegramseite diesen Kanal abonnieren zu können. Es ist optional den Identifier zu setzen. Setzt man keinen expliziten Identifier wird automatisch der Kanalname als Identifier verwendet. Es wird empfohlen den Identifier nicht zu setzen und ihn nur zu verwenden, wenn es zu Namenskonflikten kommen kann.
5. Starte einen privaten Chat mit dem Telegram Bot und gebe den Befehl `/disgram register --token=<Registrierungstoken>` ein, um deinen Telegram User zu registrieren.
6. Es gibt 3 Optionen ein Abonnement zu einem Discord Kanal herzustellen. Empfohlen wird dabei die erste Option.
   - *Option 1*: Leite aus dem Telegram Kanal, der einen Discord Kanal abonnieren soll eine Nachricht an den DisGram Bot auf Telegram weiter. Dadurch wird automatisch ein Dialog getriggert. Folge den Anweisungen um das Abonnement herzustellen.
   - *Option 2*: Abonniere den Discord Kanal auf Telegram durch den Befehl `/disgram subscribe --source=<discord kanal identifier> --target=<telegram kanal id> --retention-time=<retention time>` in einem privaten Chat mit dem Bot. Die Telegram Id des Kanals bekommt man über die [Telegram web app](https://web.telegram.org). In der Web App geht man auf den gewünschten Kanal und schaut sich die Url an. Eine Beispiel url sieht so aus
     `https://web.telegram.org/k/#-1720142932`. Die Kanal id ergibt sich aus der Zahl am Ende der Url inklusive des Minus. Man muss dabei noch eine 100 einfügen. Die Kanal id ist dann `-1001720142932`.
   - *Option 3*: So wie Option 2 nur wird der source parameter weggelassen. In dem Fall wird der Telegram Kanal für das Abonnement verwendet in dem der Befehl eingegeben wurde. Der Nachteil ist, dass jedes Mitglied des Kanals den Befehl sieht. 
7. Wird in einem abonnierbarem Discord Kanal der Befehl `/discord unset` eingegeben, wird die Abonnierbarkeit wieder aufgehoben
8. Eine Subscription wird in einem privaten Chat mit dem DisGram Bot auf Telegram durch den Befehl `/disgram unsubscribe` wieder aufgehoben. Folge dabei den Anweisungen.