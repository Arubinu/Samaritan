$( document ).ready( function () {
	if ( jQuery.browser.mobile )
	{
		$( 'body' ).addClass( 'mobile' );
	}

	var cursor = [ 0, 0 ];
	var string = [
		[ 'FIND', 'THE', 'MACHINE' ],
		[ 'I', 'WILL', 'PROTECT', 'YOU', 'NOW' ],
		[ 'STOP', 'IT.', 'NOW.' ],
		[ 'THERE', 'IS', 'NO', 'ALTERNATIVE.' ],
		[ 'INVESTIGATION', 'ONGOING' ],
		[ 'WHAT', 'ARE', 'YOUR', 'COMMANDS', '?' ]
	];

	var response = function ( select ) {
		reset = false;
		if ( select !== undefined || cursor[ 1 ] <= 0 )
		{
			reset = true;
			next = Math.floor( Math.random() * 10 ) % string.length;

			if ( next == cursor[ 0 ] )
			{
				response( -1 );
				return ;
			}
			cursor[ 0 ] = ( select == -1 || select == undefined ) ? next : select;
		}

		var current = string[ cursor[ 0 ] ]
		if ( reset )
			cursor[ 1 ] = current.length;

		--cursor[ 1 ];
		changeResponse( current[ ( current.length - 1 ) - cursor[ 1 ] ], reset, !cursor[ 1 ] );

		if ( cursor[ 1 ] <= 0 )
		{
			setTimeout( function () { changeResponse( '&nbsp;', false, true ) }, 1250 );
			callResponse( true );
		}
	};

	var changeResponse = function ( text, first, end ) {
		if ( first !== undefined && first == true )
			$( '#response' ).shuffleLetters( { 'fps': 15, 'text': text, 'callback': callResponse } );
		else
		{
			$( '#response' ).html( text );
			if ( end === undefined || end == false )
				callResponse();
		}

		var size = $( '#response' ).width() + 20;
		$( '#line' ).width( ( size > 50 ) ? size : 50 );
	};

	var callResponse = function ( rand ) {
		if ( rand !== undefined && rand == true )
			setTimeout( function () { response( -1 ); }, ( Math.floor( Math.random() * 10000 ) % 10000 ) + 5000 );
		else
			setTimeout( response, 750 );
	};

	callResponse( true );
} );
