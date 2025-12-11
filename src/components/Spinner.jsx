import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Spinner = () => {
    return (
        <div className="w-full">
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                            {/* Card Image Skeleton */}
                            <div className="mb-4">
                                <Skeleton height={200} className="w-full rounded-md" />
                            </div>

                            {/* Card Content Skeleton */}
                            <div className="space-y-3">
                                <Skeleton count={1} height={24} width="80%" />
                                <Skeleton count={1} height={16} width="60%" />
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <Skeleton width={80} height={30} />
                                    <Skeleton width={30} height={30} circle={true} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default Spinner;
