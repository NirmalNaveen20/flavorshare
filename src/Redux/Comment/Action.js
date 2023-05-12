import { CREATE_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

export const createComment = (data) => async (dispatch) => {
  console.log("data create comment",data.jwt)
  const res = await fetch(`http://localhost:5454/api/comments/create/${data.postId}`, {
    method: "POST",

     headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

    body: JSON.stringify(data.data),
  });
  console.log("create comment res ",res)

  const resData=await res.json();

  console.log("created comment", resData);
  dispatch({type:CREATE_COMMENT,payload:resData});
};


export const findPostComment=(data)=>async(dispatch)=>{
    const res= await fetch(`http://localhost:5454/api/comments/${data.postId}`,{
        method:"GET",
       
     headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
        body:JSON.stringify(data.data)
    })
    const resData=await res.json();
    dispatch({type:"GET_USER_POST",paylod:resData});
}

export const likeComment=(data)=>async(dispatch)=>{
    const res= await fetch(`http://localhost:5454/api/comments/like/${data.commentId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization:'Bearer '+data.jwt,
        },
        body:JSON.stringify(data.data)
    })
    const resData=await res.json();
    console.log("like comment :- ",resData)
    dispatch({type:LIKE_COMMENT,paylod:resData});
}

export const unLikeComment=(data)=>async(dispatch)=>{
  const res = await fetch(`http://localhost:5454/api/comments/unlike/${data.commentId}`,{
      method:"PUT",
      headers:{
          "Content-Type":"application/json",
          Authorization:'Bearer '+data.jwt,
      },
      body:JSON.stringify(data.data)
  })
  const resData=await res.json();
  console.log("unliked comment ",resData)
  dispatch({type:UNLIKE_COMMENT,paylod:resData});
}