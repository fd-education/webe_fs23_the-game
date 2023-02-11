# Dokumentation: The Game
FS 2023, Web Engineering, Fabian Diemand  
Dozent: Ilir Fetai  
Repository: https://git.ffhs.ch/fabian.diemand/webe_the_game/  

---

## Inhalt
- [1 Einleitung](#1-einleitung)
- [2 Erklärung des Spiels](#2-erklärung-des-spiels)
  - [2.1 Spielaufbau](#21-spielaufbau)
  - [2.2 Ziel des Spiels](#22-ziel-des-spiels)
  - [2.3 Spielregeln](#23-spielregeln)
  - [2.4 Spielregeln "On Fire"](#24-spielregeln-on-fire)
- [3 Projektplanung](#3-projektplanung)
- [4 Anforderungen](#4-anforderungen)
  - [4.1 Funktionale Anforderungen](#41-funktionale-anforderungen)
  - [4.2 Nicht-Funktionale Anforderungen](#42-nicht-funktionale-anforderungen)
- [5 Datenmodell](#5-datenmodell)
- [6 UI Prototyp](#6-ui-prototyp)
  - [6.1 Mobil](#61-mobil)
  - [6.2 Desktop](#62-desktop)
- [7 Architekturentscheidungen](#7-architekturentscheidungen)
- [8 Deploymentkonzept](#8-deploymentkonzept)
- [Quellen](#quellen)

---

## 1 Einleitung
Das folgende Dokument enthält die Dokumentation der Semesterarbeit im Modul WebE (Web Engineering), des Frühlingssemesters 2023 an der Fernfachhochschule Schweiz (nachfolgend FFHS). Im Kern geht es dabei um die Umsetzung einer web-basierten Applikation (fortan Web App).

## 2 Erklärung des Spiels
Die Web App wird ein Kartenspiel und ist die Umsetzung des bekannten Kartenspiels **"The Game - Spiel solange du kannst..."**. Die Spielregeln und der Spielabbau ergeben sich somit direkt aus jenen des [realen Kartenspiels](https://www.gamefactory-spiele.com/the-game). 

Informationen zum Spiel:

|                |             |
|----------------|-------------|
| Alter          | 8+ Jahre    |
| Anzahl Spieler | 1 - 5       |
| Dauer          | 20+ Minuten |
| Karten         | 98 Zahlenkarten, Werte von 2 bis 99 |

### 2.1 Spielaufbau
Zu beginn gibt es vier Einzelkarten (Zielkarten) die auf der Spielfläche liegen und vier Ablegestapel anzeigen. Von den 98 Zahlenkarten erhält jede:r Spieler:in eine gewisse Anzahl verdeckt ausgeteilt. Die Anzahl Handkarten hängt von der Anzahl Spielender ab (siehe folgende Tabelle). Die verbleibenden Zahlenkarten dienen verdeckt als Nachziehstapel.

| Anzahl Spielender | Anzahl Handkarten pro Spieler:in |
|-------------------|----------------------------------|
| 3, 4, 5           | 6                                |
| 2                 | 7                                |
| 1                 | 8                                |

### 2.2 Ziel des Spiels
Das Spiel basiert auf einem kollaborativen Ansatz. Alle Spieler:innen verfolgen also als Team das Ziel, das Spiel zu besiegen. Dies ist geschafft, wenn sämtliche 98 Spielkarten auf die vier Ablegestapel abgelegt werden konnten.

### 2.3 Spielregeln
Die Spieler:innen versuchen reihum, ihre Karten auf die Ablegestapelabzulegen. Wichtig ist dabei, dass zwei Stapel aufsteigend (2 - 100) und zwei Stapel absteigend (99 - 1) bedient werden müssen. Dabei muss die numerische Reihenfolge der Werte respektiert werden (z.B., auf einem absteigenden Ablagestapel darf keine 55 auf eine 49 gelegt werden). Solange auf dem Nachziehstapel noch Karten liegen, **müssen** alle Spieler:innen darüber hinaus in jeder Runde zwei Karten ablegen. Sobald der Nachziehstapel keine Karten mehr enthält, **muss** in jeder Spieler in jeder Runde nur noch eine Karte ablegen. Jede:r Spieler:in füllt nach dem Ablegen die Handkarten wieder vom Nachziehstapel auf.  
Mit dem **Rückwärtstrick** können Kartenstapel gerettet werden. Es ist erlaubt, eine Karte mit einer exakten Differenz von 10 (nicht 20, 30, etc.), entgegen der Zählrichtung (auf- bzw. absteigend) eines Ablagestapels zu legen. Dadurch wird der Wert des Stapels wieder um 10 erhöht, bzw. gesenkt und es können mehr Karten abgelegt werden.

### 2.4 Spielregeln "On Fire"
Nebst dem Basisspiel soll auch der Spielmodus "On Fire" spielbar sein. Die Spielkarten mit den Werten **22, 33, 44, 55, 66 und 77** werden speziell gekennzeichnet und mit der Regel versehen, dass sie **zwingend sofort (d.h. vom Spielenden, oder von der:dem nächsten Spieler:in) überdeckt** werden müssen. Kann das nicht erfüllt werden, ist das Spiel sofort verloren.

## 3 Projektplanung

## 4 Anforderungen

### 4.1 Funktionale Anforderungen
### 4.2 Nicht-Funktionale Anforderungen

## 5 Datenmodell

## 6 UI Prototyp

### 6.1 Mobil
### 6.2 Desktop

## 7 Architekturentscheidungen

## 8 Deploymentkonzept

## Quellen