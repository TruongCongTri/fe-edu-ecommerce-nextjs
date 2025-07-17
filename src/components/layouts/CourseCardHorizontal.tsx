import React from "react";

import Image from "next/image";
import { IProduct } from "@/src/types/IProduct";
import Bubble from "../buttons/Bubble";
import { LikeButton } from "../buttons/LikeButton";

interface Props {
  product: IProduct;
}

export const CourseCardHorizontal = ({ product }: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-xl p-4 shadow-sm border bg-white">
      <div className="flex-shrink-0">
        <Image
          src={"/image-not-found.png"}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md object-cover w-[100px] h-[100px]"
        />
      </div>

      <div className="flex flex-col gap-2 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600">{product.shortDesc}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.skills?.slice(0, 5).map((skill) => (
            <Bubble key={skill.id} name={skill.name}></Bubble>
          ))}
        </div>

        {/* <div className="text-sm text-gray-500">{product.category.name}</div> */}
      </div>

      <div>
        <LikeButton courseId={product.id} />
      </div>
    </div>
  );
};
