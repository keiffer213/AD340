package com.example.businesscard

import android.graphics.Paint.Align
import android.graphics.drawable.Icon
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material.icons.rounded.Menu
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.businesscard.ui.theme.BusinessCardTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BusinessCardTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
//                    color = Color.Transparent
                ) {
                    BusinessCard(
                        name = "Keiffer Tan",
                        footer = "text footer",
                        title = "Software Developer"
                    )
                }
            }
        }
    }
}

@Composable
fun BusinessCard(title: String, footer: String, name: String, modifier: Modifier = Modifier) {

    Box(
        modifier = modifier
            .background(Color.DarkGray)
            .fillMaxSize()
    ) {
        val image = painterResource(R.drawable.androidparty)
        Image(
            painter = image,
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize(),
            alpha = 0.7F
        )
        BCTitle(
            title = title,
            name = name,
            modifier = Modifier.align(Alignment.Center)
        )
        BCFooter(
            footer = footer,
            modifier = Modifier.align(Alignment.BottomCenter)
        )
    }
}

@Composable
fun BCTitle(name: String, title: String, modifier: Modifier = Modifier) {
    Column(
        modifier = modifier
            .padding(12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        val image = painterResource(R.drawable.tomo)
        Image(
            painter = image,
            contentDescription = null,
            contentScale = ContentScale.Fit,
            modifier = Modifier.size(250.dp)
        )
        Text(
            text = name,
            fontSize = 50.sp,
            color = Color.White,
//            modifier = modifier.padding(16.dp)
        )
        Text(
            text = title,
            fontSize = 25.sp,
            color = Color.White,
//            modifier = modifier.padding(16.dp)
        )
    }
}

@Composable
fun BCFooter(footer: String, modifier: Modifier = Modifier) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = modifier.padding(16.dp)
    ) {
        Column(modifier = Modifier.padding(end = 4.dp)) {
            Icon(
                imageVector = Icons.Filled.Call,
                contentDescription = "Email Icon",
                tint = Color.White,
                modifier = Modifier.padding(bottom = 12.dp)
            )
            Icon(
                imageVector = Icons.Filled.ThumbUp,
                contentDescription = "Email Icon",
                tint = Color.White,
                modifier = Modifier.padding(bottom = 12.dp)
            )
            Icon(
                imageVector = Icons.Filled.Email,
                contentDescription = "Email Icon",
                tint = Color.White
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = footer,
            color = Color.White,
            fontSize = 20.sp,
            lineHeight = 35.sp,
//            modifier = modifier.padding(16.dp)
        )
    }
}


@Preview(
    showBackground = true,
    showSystemUi = true,
    name = "My Business Card"
)
@Composable
fun BusinessCardPreview() {
    BusinessCardTheme {
        BusinessCard(
            name = "Keiffer Tan",
            title = "Software Developer",
            footer = "+00 (000) 000 - 0000 \n@socialMediaHandle \nkeiffer@gmail.com",
        )
    }
}