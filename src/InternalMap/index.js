import './styles.css';


const regions = {
  'CORREDOR DE PEDRAS': { top: '35%', left: '60%', width: '12%', height: '31%' },
  'CORREDOR DE COLINAS': { top: '35%', left: '40%', width: '12%', height: '31%' },
  'CORREDOR DE FLORES': { top: '72%', left: '40%', width: '12%', height: '31%' },
  'CORREDOR DE ARVORES': { top: '72%', left: '60%', width: '12%', height: '31%' },

  'ALAMEDA': { top: '76%', left: '51%', width: '10%', height: '30%' },
  'CORREDOR CENTRAL': { top: '76%', left: '51%', width: '10%', height: '30%' },

  'ENTRADA DAS AGUAS': { top: '54%', left: '25%', width: '13%', height: '7%' },
  'ENTRADA DAS COLINAS': { top: '23%', left: '25%', width: '13%', height: '7%' },
  'ENTRADA DAS FLORES': { top: '87%', left: '27%', width: '13%', height: '7%' },
  'ENTRADA DAS PEDRAS': { top: '15%', left: '72%', width: '13%', height: '20%' },

  'ANEL DE AGUAS': { top: '54%', left: '53%', width: '28%', height: '12%' },
  'PRACA DE ALIMENTACAO': { top: '55%', left: '53%', width: '20%', height: '5%' },

  'ALAMEDA DE SERVICOS': { top: '24%', left: '51%', width: '20%', height: '5%' },

  // 'OPERACAO EXTERNA': { top: '0%', left: '0%', width: '10px', height: '10px' },
  // 'ESTACIONAMENTO': { top: '0%', left: '0%', width: '10px', height: '10px' },
};


export function InternalMap({ highlight }) {
  return (
    <div className='InternalMap'>
      <div className='mapImage'>

        {
          Boolean(highlight && regions[highlight]) &&
            <div
              className='region'
              style={regions[highlight]}
            ></div>
        }

      </div>
    </div>
  );
}