import React, { useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from "react-dnd";
import "./styles.css"

import galleryList from "./data.js";
import AuthDetails from "../auth/AuthDetails";

const Card = ({ src, title, id, index, moveImage }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "image",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <img src={src} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

const Grid = () => {
  const [images, setImages] = React.useState(galleryList);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setFilteredImages((prevImages) => {
      const clonedImages = [...prevImages];
      const removedItem = clonedImages.splice(dragIndex, 1)[0];

      clonedImages.splice(hoverIndex, 0, removedItem);
      return clonedImages;
    });
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = images.filter((image) =>
      image.title.toLowerCase().includes(query)
    );
    setFilteredImages(filtered);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <h2 className="authtext">HNGX INTERNSHIP</h2>
      <div className="authDetails">
      <AuthDetails/>
      </div>
      <h1 className="text">Gallery for Virtually Appealing Images</h1>
      <main>
        {React.Children.toArray(
          filteredImages.map((image, index) => (
            <Card
              src={image.img}
              title={image.title}
              id={image.id}
              index={index}
              moveImage={moveImage}
            />
          ))
        )}
      </main>
    </DndProvider>
  );
};

export default Grid;
