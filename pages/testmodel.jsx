import Page from "../components/Page";
import { FemaleModel } from "../components/models";
import { useState } from "react";

export default function ModelContainer(type,reverse) {
  const [selected,setSelected]=useState("");
  return (
    <Page title="Results">
      <div className="graphicselector">
        <div className="modelwrapper">
        <FemaleModel selected={selected} changer={setSelected}/>
        </div>
        <div className="selection">
          <div className="selected">
            <h3>Selected: {selected}</h3>
          </div>
          <div className="partoptions">

          </div>
        </div>
      </div>
      <style jsx>{`
        .testmodel{
          animation: rotate 5s ease infinite;
          animation-direction: alternate;
        }
        .testmodel:hover{
          animation: none
        }
        @keyframes rotate {
          from {
            opacity: 0.0;
            transform: rotateY(0deg)
          }
          to {
            opacity: 1.0;
            transform: rotateY(180deg) scaleZ(2)
          }
        }
      `}</style>
    </Page>
  );
}
