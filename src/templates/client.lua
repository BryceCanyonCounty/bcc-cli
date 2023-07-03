---------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------- Client File (This is code that is run on the players side) -------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------

---------------- NUI Example ----------------
--[[RegisterCommand('testNUI', function(source, args, rawCommand)
    -- NUI SendNUIMessage lets you talk from Lua to HTML/JS
    SendNUIMessage({
        type = 'open',
        message = _U('HelloWorld')
    })
    SetNuiFocus(true, true) -- Sets the focus of the player view to NUI
end)]]

-- NUI Callback lets you talk from HTML/JS to Lua
--[[RegisterNUICallback('close', function(args, cb)
    SetNuiFocus(false, false) -- Sets the focus of the player view away from NUI
    cb('ok')
end)]]

---------------- Server Call Examples ----------------
-- "boilerplate:giveMeat" is the name of the RegisterServerEvent in server.lua
--[[RegisterCommand("giveMeat", function(args, rawCommand) --  COMMAND
    TriggerServerEvent('boilerplate:giveMeat')	
end)]]

---------------- Notification Examples ----------------
--[[RegisterCommand("clientnotify", function(args, rawCommand) --  COMMAND
    TriggerEvent('vorp:NotifyLeft', "first text", "second text", "generic_textures", "tick", 4000)
    Wait(4000)
    TriggerEvent('vorp:Tip', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:NotifyTop', "your text", "TOWN_ARMADILLO", 4000)
    Wait(4000)
    TriggerEvent('vorp:TipRight', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:TipBottom', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:ShowTopNotification', "your text", "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:ShowAdvancedRightNotification', "your text", "generic_textures", "tick", "COLOR_PURE_WHITE", 4000)
    Wait(4000)
    TriggerEvent('vorp:ShowBasicTopNotification', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:ShowSimpleCenterText', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:ShowBottomRight', "your text", 4000)
    Wait(4000)
    TriggerEvent('vorp:deadplayerNotifY', "tittle", "Ledger_Sounds", "INFO_HIDE", 4000)
    Wait(4000)
    TriggerEvent('vorp:updatemissioNotify', "tittleid", "tittle", "message", 4000)
    Wait(4000)
    TriggerEvent('vorp:warningNotify', "tittle", "message", "Ledger_Sounds", "INFO_HIDE", 4000)
end)]]
