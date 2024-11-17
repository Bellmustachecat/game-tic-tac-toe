"use client";

import React, { useState, useEffect } from "react";

interface TicTacToeProps {
    userName: string;
}

export default function TicTacToe({ userName }: TicTacToeProps) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [score, setScore] = useState({ player: 0, bot: 0 });
    const [currentWinner, setCurrentWinner] = useState<string | null>(null);
    const [winStreak, setWinStreak] = useState(0);
    const [bonusMessage, setBonusMessage] = useState<string | null>(null);

    const handlePlayerMove = (index: number) => {
        if (board[index] || currentWinner || !isPlayerTurn) return;

        const updatedBoard = [...board];
        updatedBoard[index] = "X";
        setBoard(updatedBoard);
        setIsPlayerTurn(false);
    };

    const executeBotMove = () => {
        const availableIndices = board
            .map((value, index) => (value === null ? index : null))
            .filter((value) => value !== null) as number[];

        if (availableIndices.length === 0) return;
        const randomIndex =
            availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const updatedBoard = [...board];
        updatedBoard[randomIndex] = "O";
        setBoard(updatedBoard);
        setIsPlayerTurn(true);
    };

    const determineWinner = (grid: string[]) => {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                return { winner: grid[a], winningLine: pattern };
            }
        }

        if (grid.every((cell) => cell !== null)) {
            return { winner: "Tie", winningLine: null };
        }
        return { winner: null, winningLine: null };
    };

    useEffect(() => {
        const result = determineWinner(board);

        if (result.winner) {
            setCurrentWinner(result.winner);

            if (result.winner === "X") {
                setWinStreak((prev) => prev + 1);
                setScore((prev) => {
                    const bonus = winStreak === 2 ? 1 : 0;
                    if (bonus > 0) {
                        setBonusMessage("คุณชนะ 3 ครั้งติดได้ Double Bonus!");
                        setTimeout(() => setBonusMessage(null), 3000);
                    }
                    return { ...prev, player: prev.player + 1 + bonus };
                });
            } else if (result.winner === "O") {
                setWinStreak(0);
                setScore((prev) => ({
                    ...prev,
                    player: prev.player > 0 ? prev.player - 1 : 0,
                    bot: prev.bot + 1,
                }));
            }

            setTimeout(resetGame, 2000);
        } else if (!isPlayerTurn) {
            const timer = setTimeout(executeBotMove, 500);
            return () => clearTimeout(timer);
        }
    }, [board, isPlayerTurn]);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentWinner(null);
        setIsPlayerTurn(true);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative grid grid-cols-3 gap-4">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handlePlayerMove(index)}
                        className={`w-20 h-20 text-3xl font-bold flex items-center justify-center rounded-lg transition-all duration-300 transform ${cell === "X"
                            ? "bg-blue-500 text-white scale-110"
                            : cell === "O"
                                ? "bg-red-500 text-white scale-110"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:scale-105"
                            }`}
                    >
                        {cell}
                    </button>
                ))}
            </div>

            {currentWinner && (
                <div className="text-xl">
                    {currentWinner === "Tie"
                        ? "It's a Tie!"
                        : currentWinner === "X"
                            ? `${userName} Wins!`
                            : "Bot Wins!"}
                </div>
            )}

            {bonusMessage && (
                <div className="text-green-500 font-bold text-lg">{bonusMessage}</div>
            )}

            <div className="flex items-center gap-8">
                <div className="text-lg">{userName}: {score.player}</div>
                <div className="text-lg">Bot: {score.bot}</div>
            </div>
        </div>
    );
}
