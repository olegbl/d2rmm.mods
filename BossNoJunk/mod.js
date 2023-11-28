const treasureclassexFilename = 'global\\excel\\treasureclassex.txt';
const treasureclassex = D2RMM.readTsv(treasureclassexFilename);
treasureclassex.rows.forEach((row) => {
  const treasureClass = row['Treasure Class'];
  var boss = false;

  switch(treasureClass) {
    case 'Andariel':
    case 'Andariel (N)':
    case 'Andariel (H)':
      boss = true;
      row.Unique = 995;
      row.Set = 995;
      row.Rare = 1024;
      break;
    case 'Duriel - Base':
    case 'Duriel - Base Desecrated A':
    case 'Duriel - Base Desecrated B':
    case 'Duriel - Base Desecrated C':
    case 'Duriel (N) - Base':
    case 'Duriel (N) - Base Desecrated A':
    case 'Duriel (N) - Base Desecrated B':
    case 'Duriel (N) - Base Desecrated C':
    case 'Duriel (H) - Base':
    case 'Duriel (H) - Base Desecrated A':
    case 'Duriel (H) - Base Desecrated B':
    case 'Duriel (H) - Base Desecrated C':
    case 'Duriel (H) - Base Desecrated D':
    case 'Mephisto':
    case 'Mephisto Desecrated A':
    case 'Mephisto Desecrated B':
    case 'Mephisto Desecrated C':
    case 'Mephisto (N)':
    case 'Mephisto (N) Desecrated A':
    case 'Mephisto (N) Desecrated B':
    case 'Mephisto (N) Desecrated C':
    case 'Mephisto (H)':
    case 'Mephisto Item (H) Desecrated A':
    case 'Mephisto Item (H) Desecrated B':
    case 'Mephisto Item (H) Desecrated C':
    case 'Mephisto Item (H) Desecrated D':
    case 'Diablo':
    case 'Diablo Desecrated A':
    case 'Diablo Desecrated B':
    case 'Diablo Desecrated C':
    case 'Diablo (N)':
    case 'Diablo (N) Desecrated A':
    case 'Diablo (N) Desecrated B':
    case 'Diablo (N) Desecrated C':
    case 'Diablo (H)':
    case 'Diablo Item (H) Desecrated A':
    case 'Diablo Item (H) Desecrated B':
    case 'Baal':
    case 'Baal Desecrated':
    case 'Baal (N)':
    case 'Baal (N) Desecrated':
    case 'Baal (H)':
    case 'Baal Item (H) Desecrated':
    case 'Baal (H) Desecrated':
      boss = true;
      row.Unique = 993;
      row.Set = 993;
      row.Rare = 1024;
      break;
    case 'Radament':
    case 'Radament Desecrated A':
    case 'Radament Desecrated B':
    case 'Radament Desecrated C':
    case 'Radament (N)':
    case 'Radament (N) Desecrated A':
    case 'Radament (N) Desecrated B':
    case 'Radament (N) Desecrated C':
    case 'Radament (H)':
    case 'Radament Item (H) Desecrated A':
    case 'Radament Item (H) Desecrated B':
    case 'Radament Item (H) Desecrated C':
    case 'Radament Item (H) Desecrated D':
    case 'Haphesto':
    case 'Haphesto Desecrated A':
    case 'Haphesto Desecrated B':
    case 'Haphesto Desecrated C':
    case 'Haphesto (N)':
    case 'Haphesto (N) Desecrated A':
    case 'Haphesto (N) Desecrated B':
    case 'Haphesto (N) Desecrated C':
    case 'Haphesto (H)':
    case 'Haphesto Item (H) Desecrated A':
    case 'Haphesto Item (H) Desecrated B':
    case 'Haphesto Item (H) Desecrated C':
    case 'Council':
    case 'Council Desecrated A':
    case 'Council Desecrated B':
    case 'Council Desecrated C':
    case 'Council (N)':
    case 'Council (N) Desecrated A':
    case 'Council (N) Desecrated B':
    case 'Council (N) Desecrated C':
    case 'Council (H)':
    case 'Council Item (H) Desecrated A':
    case 'Council Item (H) Desecrated B':
    case 'Council Item (H) Desecrated C':
    case 'Council Item (H) Desecrated D':
    case 'Council Item (H) Desecrated E':
    case 'Summoner':
    case 'Summoner Desecrated A':
    case 'Summoner Desecrated B':
    case 'Summoner Desecrated C':
    case 'Summoner (N)':
    case 'Summoner (N) Desecrated A':
    case 'Summoner (N) Desecrated B':
    case 'Summoner (N) Desecrated C':
    case 'Summoner (H)':
    case 'Summoner Item (H) Desecrated A':
    case 'Summoner Item (H) Desecrated B':
    case 'Summoner Item (H) Desecrated C':
    case 'Summoner Item (H) Desecrated D':
    case 'Summoner Item (H) Desecrated E':
    case 'Summoner Item (H) Desecrated F':
    case 'Nihlathak':
    case 'Nihlathak Desecrated':
    case 'Nihlathak (N)':
    case 'Nihlathak (N) Desecrated':
    case 'Nihlathak (H)':
    case 'Nihlathak Item (H) Desecrated':
    case 'Nihlathak (H) Desecrated':
    case 'Blood Raven':
    case 'Blood Raven Desecrated A':
    case 'Blood Raven Desecrated B':
    case 'Blood Raven Desecrated C':
    case 'Blood Raven (N)':
    case 'Blood Raven (N) Desecrated A':
    case 'Blood Raven (N) Desecrated B':
    case 'Blood Raven (N) Desecrated C':
    case 'Blood Raven (H)':
    case 'Blood Raven Item (H) Desecrated A':
    case 'Blood Raven Item (H) Desecrated B':
    case 'Blood Raven Item (H) Desecrated C':
    case 'Blood Raven Item (H) Desecrated D':
    case 'Izual':
    case 'Izual Desecrated A':
    case 'Izual Desecrated B':
    case 'Izual Desecrated C':
    case 'Izual (N)':
    case 'Izual (N) Desecrated A':
    case 'Izual (N) Desecrated B':
    case 'Izual (N) Desecrated C':
    case 'Izual (H)':
    case 'Izual Item (H) Desecrated A':
    case 'Izual Item (H) Desecrated B':
    case 'Izual Item (H) Desecrated C':
    case 'Izual Item (H) Desecrated D':
    case 'Countess Item':
    case 'Countess Item Desecrated A':
    case 'Countess Item Desecrated B':
    case 'Countess Item Desecrated C':
    case 'Countess Item (N)':
    case 'Countess Item (N) Desecrated A':
    case 'Countess Item (N) Desecrated B':
    case 'Countess Item (N) Desecrated C':
    case 'Countess Item (H)':
    case 'Countess Item (H) Desecrated A':
    case 'Countess Item (H) Desecrated B':
    case 'Countess Item (H) Desecrated C':
    case 'Countess Item (H) Desecrated D':
    case 'Countess Item (H) Desecrated E':
    case 'Countess Item (H) Desecrated F':
      boss = true;
      break;
    case '':
    case 'Andarielq':
    case 'Andarielq Desecrated A':
    case 'Andarielq Desecrated B':
    case 'Andarielq Desecrated C':
    case 'Andarielq (N)':
    case 'Andarielq (N) Desecrated A':
    case 'Andarielq (N) Desecrated B':
    case 'Andarielq (N) Desecrated C':
    case 'Andarielq (H)':
    case 'Andarielq Item (H) Desecrated A':
    case 'Andarielq Item (H) Desecrated B':
    case 'Andarielq Item (H) Desecrated C':
    case 'Andarielq Item (H) Desecrated D':
    case 'Andarielq Item (H) Desecrated E':
    case 'Andarielq Item (H) Desecrated F':
    case 'Andarielq Item (H) Desecrated G':
    case 'Andarielq Item (H) Desecrated H':
    case 'Durielq - Base':
    case 'Durielq (N) - Base':
    case 'Durielq (H) - Base':
    case 'Mephistoq':
    case 'Mephistoq (N)':
    case 'Mephistoq (H)':
    case 'Diabloq':
    case 'Diabloq (N)':
    case 'Diabloq (H)':
    case 'Baalq':
    case 'Baalq (N)':
    case 'Baalq (H)':
      row.NoDrop = 0;
      break;
    default:
      break;
  }

  if (boss) {
    row.NoDrop = 0;
    row.Item3 = row.Item4;
    row.Prob3 = row.Prob4;
    row.Item4 = row.Item5;
    row.Prob4 = row.Prob5;
    row.Item5 = '';
    row.Prob5 = '';
  }
});
D2RMM.writeTsv(treasureclassexFilename, treasureclassex);
