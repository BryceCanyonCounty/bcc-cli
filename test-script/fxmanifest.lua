fx_version 'adamant'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'
lua54 'yes'
version '0.0.1'
author 'Bytesizd'

client_scripts {
   'client/plugins/dataview.lua',
   'client/main.lua',
}

server_scripts {
   '@oxmysql/lib/MySQL.lua',
   'server/main.lua',
}

shared_scripts {
}

--------------------------------------------------------------------------------------

---------------- Dependencies -------------------------------------------------------
---- What other scripts (if any) does your script depend on. REMOVE THIS IF NONE ----
dependencies { 
    'vorp_core'
}
--------------------------------------------------------------------------------------

---------------- Exports -------------------------------------------------------------
------------- If you need ------------------------------------------------------------
exports {}
--------------------------------------------------------------------------------------