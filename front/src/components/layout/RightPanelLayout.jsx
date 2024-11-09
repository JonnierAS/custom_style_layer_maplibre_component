import * as T from "@radix-ui/react-tooltip";
import classed from "classed-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ContentLayout from "./contentLayout/ContentLayout";
import { useLocalState } from "../context/CleanLocalState";

export function RightPanelLayoutBtn({ side, setShowPanel, showPanel }) {
  const {setApplyTransition} = useLocalState()
  const togglePanel = () => {
    setShowPanel(!showPanel);
    setApplyTransition(true)
    setTimeout(() => setApplyTransition(false), 500);
  };

  return (
    <T.Provider>
      <T.Root>
        <T.Trigger
          onClick={togglePanel}
          aria-label="Abrir panel"
          className={clsx(
            side === "right" ? "right-0" : "left-0",
            side === "right"
              ? "border-l rounded-r-none"
              : "border-r rounded-l-none",
            `
            absolute px-0.5 py-2 top-1/2 border-t border-b
            bg-white hover:bg-purple-100 border-gray-300
            rounded
          `
          )}
        >
          {showPanel ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </T.Trigger>
        <T.Portal>
          <TContent>
            <div className="whitespace-nowrap">
              {showPanel ? "Ocultar Panel" : "Expandir Panel"}
            </div>
          </TContent>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}

export function SidePanel({ side, panelWidth, setPanelWidth,setShowPanel,showPanel,mapRender }) {
  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
 

  useEffect(() => {

    if(panelWidth <= 220){
      setShowPanel(false)
      setPanelWidth(360)
    }

    const handleMouseMove = (e) => {
      if (isResizing) {
        const deltaX = e.clientX - initialX;
        const newWidth =
          side === "right" ? panelWidth - deltaX : panelWidth + deltaX;
        setPanelWidth(newWidth);
        setInitialX(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, initialX, panelWidth, setPanelWidth, side]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setInitialX(e.clientX);
  };

  const panelStyles = {
    width: panelWidth,
    height: "100vh",
  };

  return (
    <>
      <div
        className={clsx(
          "sidepanel-container",
          side === "right" ? "right-0" : "left-0"
        )}
      >
        <div
          style={panelStyles}
          className={clsx(
            "sidepanel-content",
            "absolute",
            "pl-2",
            "border-t",
            "border-b",
            "bg-white"
          )}
        >
          <div className="">
              <ContentLayout mapRender={mapRender}
              />
          </div>
        </div>
        <button
          type="button"
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panel"
          tabIndex="1"
          className={clsx(
            "absolute",
            "top-0",
            "bottom-0",
            "touch-none",
            "flex",
            "items-center",
            "justify-center",
            "w-1",
            "z-max",
            "bg-indigo-300",
            "hover:bg-indigo-400"
          )}
          style={{
            cursor: "col-resize",
            right: side === "right" ? panelWidth - 5 : "unset",
            left: side === "left" ? 0 : "unset",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="hover-hover:hidden h-16 w-1 rounded" />
        </button>
      </div>
    </>
  );
}

export const TContent = classed(T.Content)(({ size = "sm" }) => [
  {
    "min-w-md": size === "sm",
    "w-64": size === "md",
  },
  `px-2 py-1 rounded
    z-50
    text-sm
    border
    shadow-sm
    text-gray-700          
    bg-white               
    border-gray-200        
    `,
]);
