import React, { useState } from 'react'
import Video from './Video'
import { Link } from 'react-router-dom'
import useVideoList from '../hooks/useVideoList'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './Loader'

function Videos() {
    const [page,setPage] = useState(1);
    const {loading,error,videos,hasMore} = useVideoList(page);
    return (
        <div>
            {
                !loading && videos.length>0 && 
                (
                    <InfiniteScroll
                        dataLength={videos.length}
                        hasMore={hasMore}
                        next={()=>setPage(page+8)}
                        loader={<h4>Loading...</h4>}
                    >
                        {
                        videos.map((video)=>(
                            video.noq>0?(
                                <Link to={`/quiz/${video.youtubeID}`} state={{videoTitle : video.title}} key={video.youtubeID}>
                                    <Video
                                        key = {video.youtubeID}
                                        title = {video.title}
                                        id = {video.youtubeID}
                                        noq = {video.noq}
                                        loading={loading}
                                    />
                                </Link>
                            ):(
                                <Video
                                    key = {video.youtubeID}
                                    title = {video.title}
                                    id = {video.youtubeID}
                                    noq = {video.noq}
                                />
                            )
                        ))
                        }
                    </InfiniteScroll>
                )
            }
            {!loading && videos.length===0 && (<div>No Data Found!</div>)}
            {error && <div className="error">There was an error!</div>}
            {loading && <Loader loading="global" />}
        </div>
    )
}

export default Videos
