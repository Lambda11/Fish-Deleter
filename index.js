
const filetId = 204052;

module.exports = function FishDeleter(mod) {
	const command = mod.command;
	let enabled = true;
	let myGameId = 0n;
		
    command.add('fd', {
        $none() {
            enabled = !enabled;
			command.message(`Fish-Deleter is now: ${enabled ? "enabled" : "disabled"}.`);
		}
	});
	
	mod.hook('S_LOGIN', 12, (event) => {
		myGameId = event.gameId;
	})
	
	mod.hook('S_INVEN', 16, (event) => {
		if (!enabled) return;
		
		for (var i = 0; i < event.items.length; i++)
		{
			if (event.items[i].id === filetId && event.items[i].amount > 9000)
			{
				mod.toServer('C_DEL_ITEM', 2, {
					gameId: myGameId,
					slot: (event.items[i].slot - 40),
					amount: 1000
				});
				break;
			}
		}
	});
}