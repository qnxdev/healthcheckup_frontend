import { useState } from "react";
import { Button } from "./Button";
import { MaleModel } from "./MaleModel";
import { FemaleModel } from "./FemaleModel";
import { SymtomInput } from "./SymptomInput";

export default function ModelContainer({ type, list, setList, next }) {
  const [selected, setSelected] = useState("");
  const [reverse, setReverse] = useState(false);
  return (
    <>
      <div className="graphicselector">
        <div className="modelwrapper">
          {type == "Male" ? (
            <MaleModel
              reverse={reverse}
              selected={selected}
              changer={setSelected}
            />
          ) : (
            <FemaleModel
              reverse={reverse}
              selected={selected}
              changer={setSelected}
            />
          )}
          <div className="gearwrapper">
          <Button inverted onClick={() => setReverse(!reverse)} width="200px">
            <div className="gear">
              <i className="rotateicon"></i> Rotate
            </div>
          </Button>
          </div>
        </div>

        <div className="selection">
          <div className="selected">
            <h1>Selected: {selected || "None"}</h1>
          </div>
          <div className="partoptions">
            <SymtomInput list={list} setList={setList} secondary next={next} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .modelwrapper {
          width: 50%;
        }
        .graphicselector {
          display: flex;
        }
        .testmodel {
          animation: rotate 5s ease infinite;
          animation-direction: alternate;
        }
        .testmodel:hover {
          animation: none;
        }

        @keyframes rotate {
          from {
            opacity: 0;
            transform: rotateY(0deg);
          }
          to {
            opacity: 1;
            transform: rotateY(180deg) scaleZ(2);
          }
        }

        i.rotateicon {
          width: 25px;
          height: 22px;
          background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%220%200%2025%2022%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%220px%22%20fill%3D%22%23fff%22%20stroke%3D%22%23fff%22%3E%0A%20%20%3Cpath%20d%3D%22M10.555%2012.969C5.717%2012.759%202%2011.509%202%2010c0-1.657%204.477-3%2010-3s10%201.343%2010%203c0%201.23-2.468%202.287-6%202.75v1.965c4.66-.686%208-2.538%208-4.715%200-2.761-5.373-5-12-5S0%207.239%200%2010c0%202.567%204.642%204.682%2010.619%204.967l-1.326%201.326%201.414%201.414L14.414%2014l-3.707-3.707-1.414%201.414%201.262%201.262z%22/%3E%3C/svg%3E);
          background-repeat: no-repeat;
          border-radius: 0;
          vertical-align: top;
          display: inline-block;
          margin-right: 8px;
        }
        .gearwrapper{
          margin-top: 10px;
        }
        .gear {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
        }
        .gear:hover i.rotateicon {
          background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%220%200%2025%2022%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%220px%22%20fill%3D%22%777%22%20stroke%3D%22%777%22%3E%0A%20%20%3Cpath%20d%3D%22M10.555%2012.969C5.717%2012.759%202%2011.509%202%2010c0-1.657%204.477-3%2010-3s10%201.343%2010%203c0%201.23-2.468%202.287-6%202.75v1.965c4.66-.686%208-2.538%208-4.715%200-2.761-5.373-5-12-5S0%207.239%200%2010c0%202.567%204.642%204.682%2010.619%204.967l-1.326%201.326%201.414%201.414L14.414%2014l-3.707-3.707-1.414%201.414%201.262%201.262z%22/%3E%3C/svg%3E);
        }
        .selection {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 50%;
          flex-direction: column;
        }
        .partoptions{
          width: 20vw;
          display: flex;

        }

@media (max-width: 640px) {
  .modelwrapper, .selection{
    width: 100%
  }
  .graphicselector{
    flex-direction: column;
  }}
      `}</style>
    </>
  );
}
