['global\\excel\\cubemain.txt', 'global\\excel\\base\\cubemain.txt'].forEach(
  (cubemainFilename) => {
    const cubemain = D2RMM.readTsv(cubemainFilename);
    if (config.unsocket) {
      const unsocketRecipe = {
        description: 'Empty Sockets',
        enabled: 1,
        version: 100,
        numinputs: 2,
        // input 1 defined below
        'input 2': config.item,
        output: '"useitem,rem"',
        '*eol': 0,
      };

      function addRecipe(code, name) {
        cubemain.rows.push({
          ...unsocketRecipe,
          description: `${unsocketRecipe.description} On ${name}`,
          'input 1': `"${code},sock"`,
        });
      }

      if (config.weapon) {
        addRecipe('weap', 'Weapon');
      }

      if (config.armor) {
        // helm, gloves, boots, belt are subtypes of armo
        addRecipe('armo', 'Armor');
      }

      if (config.jewelry) {
        addRecipe('ring', 'Ring');
        addRecipe('amul', 'Amulet');
      }
    }
    for (let sockets = 1; sockets <= 6; sockets = sockets + 1) {
      if (config.socket) {
        const socketRecipe = {
          description: `Add ${sockets} Sockets`,
          enabled: 1,
          version: 100,
          numinputs: sockets + 1,
          // input 1 defined below
          'input 2': `"${config.item},qty=${sockets}"`,
          output: 'useitem',
          'mod 1': 'sock',
          'mod 1 min': sockets,
          'mod 1 max': sockets,
          '*eol': 0,
        };

        // input types come from itemtypes.text Code column

        function addRecipe(code, name) {
          cubemain.rows.push({
            ...socketRecipe,
            description: `${socketRecipe.description} To ${name}`,
            'input 1': `"${code},nos"`,
          });
        }

        if (config.weapon) {
          addRecipe('weap', 'Weapon');
        }

        if (config.armor) {
          // helm, gloves, boots, belt are subtypes of armo
          addRecipe('armo', 'Armor');
        }

        if (config.jewelry) {
          addRecipe('ring', 'Ring');
          addRecipe('amul', 'Amulet');
        }
      }
    }
    D2RMM.writeTsv(cubemainFilename, cubemain);
  },
);
