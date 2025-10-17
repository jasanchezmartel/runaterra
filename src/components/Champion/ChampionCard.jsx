import './ChampionCard.css';

const ChampionCardFixed = ({ 
  championName, 
  region,
  showName = true, 
  className = "" 
}) => {
  console.log('ChampionCardFixed - championName:', championName);
  
  const championNameMapping = {
    "Maestro Yi": "MasterYi",
    "Kai'Sa": "KaiSa",
    "Dr. Mundo": "DrMundo",
    "Wukong": "MonkeyKing",
    "Le Blanc": "Leblanc",
    "Bel'Veth": "Belveth",
    "Cho'Gath": "Chogath",
    "Kai'Sa": "Kaisa",
    "Kha'Zix": "Khazix",
    "Vel'Koz": "Velkoz",
    "Bardo": "Bard",
    "Renata Glasc": "Renata",
  };

  const getFormattedName = (name) => {
    if (championNameMapping[name]) {
      return championNameMapping[name];
    }
    
    return name.replace(/'/g, '').replace(/\s/g, '').replace(/\./g, '').trim();
  };

  const formattedName = getFormattedName(championName);
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedName}_0.jpg`;
  const championClass = `champion-card ${className} ${region ? `region-${region.toLowerCase().replace(/\s/g, '-')}` : ''}`;

  return (
      <div className={championClass}>
        <img src={imageUrl} alt={championName} className="champion-image" />
          {showName && (
            <div className={`champion-name region-${region ? region.toLowerCase().replace(/\s/g, '-') : 'default'}`}>
              {championName}
            </div>
          )}
      </div>
  );
};

export default ChampionCardFixed;