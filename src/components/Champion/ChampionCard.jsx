import './ChampionCard.css';

const ChampionCard = ({ 
  championName, 
  region,
  showName = true, 
  className = "",
  isBanned = false,
  onToggleBan
}) => {
  
  const championNameMapping = {
    "Maestro Yi": "MasterYi",
    "Kai'Sa": "KaiSa",
    "Dr. Mundo": "DrMundo",
    "Wukong": "MonkeyKing",
    "Le Blanc": "Leblanc",
    "Bel'Veth": "Belveth",
    "Cho'Gath": "Chogath",
    "Kai'Sa" : "Kaisa",
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
  const championClass = `champion-card ${className} ${region ? `region-${region.toLowerCase().replace(/\s/g, '-')}` : ''} ${isBanned ? 'banned' : ''}`;

  const handleClick = () => {
    if (onToggleBan) {
      onToggleBan();
    }
  };

  return (
      <div className={championClass} onClick={handleClick}>
        <img src={imageUrl} alt={championName} className="champion-image" />
        {isBanned && (
          <div className="ban-tooltip">
            CLICK PARA DESBANEAR
          </div>
        )}
        {showName && (
          <div className={`champion-name region-${region ? region.toLowerCase().replace(/\s/g, '-') : 'default'}`}>
            {championName}
          </div>
        )}
      </div>
  );
};

export default ChampionCard;