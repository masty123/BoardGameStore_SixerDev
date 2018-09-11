$(document).ready(function(){
  $('.delete-article').on('click',function (e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
       type: 'DELETE',
       url: '/articles/'+id,
       success: function(respone){
         alert('Deleting Article');
         window.location.href='/';
       },
       error: function(err){
         console.log(err);
       }
    });
  })
});

$(document).ready(() => {
    $('.delete-athlete').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/athletes/' + id,
            success: () => {
              alert('Deleting Athlete');
              window.location.href='/';
            },
            error: (err) => {
                console.log(err);
            }
        });
    })
});
