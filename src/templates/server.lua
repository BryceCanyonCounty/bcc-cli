---------------------------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------- Server File (This is code that is run globally on the server) ----------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------------------------------


---------------- Initialize Vorpcore ----------------
local VORPcore = {}
local VORPinv

TriggerEvent("getCore", function(core)
    VORPcore = core
end)

---------------- Initialize Vorpcore Inventory API ----------------
VORPinv = exports.vorp_inventory:vorp_inventoryApi()

---------------- VORP Core Export API Examples ----------------
-- local Character = VorpCore.getUser(_source).getUsedCharacter

---------------- VORP Inventory Export API Examples ----------------

---------------- Items ----------------
-- RegisterUsableItem let you register an item in your Database as useable.
--[[VorpInv.RegisterUsableItem("meat", function(data)
    -- Code here will enact when an item is "used"
    
    VorpInv.subItem(data.source, "meat", 1) --Removed 1 meat item from the players inventor
    VorpInv.CloseInv(data.source) --Close the players Inventory window
end)]]

-- Register a Server Event, this allows the client to communicate to the server.
-- REPLACE boilerplate with your script name.
--[[RegisterServerEvent("boilerplate:giveMeat")
AddEventHandler("boilerplate:giveMeat", function()
    -- Localize source to ensure it is available
    local _source = source 
    
    -- local playerinv = VorpInv.getUserInventory(_source) -- Get the players total inventory as a table.
    -- local count = VorpInv.getItemCount(_source, 'meat') -- Get the amount of an item in the players inventory.
    
    VorpInv.addItem(_source, 'meat', 1) --Add Item will not add more than the items max defined in the database..
end)]]

---------------- Weapons ----------------
-- CREATE A WEAPON
-- VorpInv.createWeapon(tonumber(_source), item, ammo, components)

-- REMOVE A WEAPON
--  VorpInv.subWeapon(_source, item)

-- ADD A WEAPON
-- VorpInv.giveWeapon(_source, item, 0)

---------------- Notification Examples ----------------
--[[RegisterCommand("servernotify", function(source, args, rawCommand)
    local _source = source

    TriggerClientEvent('vorp:NotifyLeft', _source, "first text", "second text", "generic_textures", "tick", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:Tip', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:NotifyTop', _source, "your text", "TOWN_ARMADILLO", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:TipRight', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:TipBottom', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:ShowTopNotification', _source, "your text", "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:ShowAdvancedRightNotification', _source, "your text", "generic_textures", "tick", "COLOR_PURE_WHITE", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:ShowBasicTopNotification', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:ShowSimpleCenterText', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:ShowBottomRight', _source, "your text", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:deadplayerNotifY', _source, "tittle", "Ledger_Sounds", "INFO_HIDE", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:updatemissioNotify', _source, "tittleid", "tittle", "message", 4000)
    Wait(4000)
    TriggerClientEvent('vorp:warningNotify', _source, "tittle", "message", "Ledger_Sounds", "INFO_HIDE", 4000)
end)]]

---------------- Helper Function Examples ----------------
---------------- Use the associated functions.lua to abstract your functions and keep the main files clean. ----------------
--[[RegisterCommand("jobCheck", function(source, args, rawCommand)
    local _source = source 

    local User = VorpCore.getUser(_source) --Get the active VorpCore player
    local Character = User.getUsedCharacter --Get the active Character
    local job = Character.job --Get the job from the characters table

    local validJob = jobCheck(job) --Use server helper function from functions.lua

    if validJob == true then
        TriggerClientEvent('vorp:TipBottom', _source, "You have the job!", 4000)
    else
        TriggerClientEvent('vorp:TipBottom', _source, "You do not have the job.", 4000)
    end
end)]]




---------------- DataBase Query Examples ----------------
---------------- SQL Knowledge is needed to utilize DataBase Queries ----------------
---------------- Examples are very simplistic and should be drasstically expanded upon if used. ----------------
--[[RegisterCommand("sqltest", function(source, args, rawCommand)
    local User = VorpCore.getUser(source)
    local _source = source
    local Character = User.getUsedCharacter
    local identifier = Character.identifier
    local charid = Character.charIdentifier

    -- Insert/Add data to a database table, the table is named 'test'
    exports.ghmattimysql:execute("INSERT INTO test (id, name) VALUES (@identifier, @name)", {["@identifier"] = identifier, ["@name"] = 'testuser'}, function(result)
        if result then
            -- Do something here, the insert has succeeded
            -- Code Here 
        end
    end)
    
    -- Grab all data from a database table, the table is named 'test'
    exports.ghmattimysql:execute("SELECT * FROM test", {}, function(result)
        if result[1] then
            -- Do something with the data obtained from DataBase
            -- Code Here    
        end
    end)

    -- Grab a specific data column from a database table, the table is named 'test', where the name of the user is 'testuser'
    exports.ghmattimysql:execute("SELECT id FROM test WHERE name = @name", {["@name"] = 'testuser'}, function(result)
        if result[1] then
            -- Do something with the data obtained from DataBase
            -- Code Here    
        end
    end)

    -- Grab a specific data column from a database table, the table is named 'test', where the name of the user is 'testuser'
    exports.ghmattimysql:execute("SELECT id FROM test WHERE name = @name", {["@name"] = 'testuser'}, function(result)
        if result[1] then
            -- Do something with the data obtained from DataBase
            -- Code Here    
        end
    end)

    exports.ghmattimysql:execute("UPDATE test SET name = @name WHERE identifier = @identifier", {["@update"] = 'testuser1', ["@identifier"] = identifier}, function(result)
        -- Data has been updated, do something (maybe notify)
        -- Code Here    
    end)

    exports.ghmattimysql:execute("DELETE FROM test WHERE identifier = @identifier", {["@identifier"] = identifier}, function(result)
        if result then
            if result.affectedRows >= 1 then
                -- Your data has been removed! Do something (maybe notify)
                -- Code Here
            end
        end
    end)
end)]]